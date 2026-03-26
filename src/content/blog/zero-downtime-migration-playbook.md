---
title: "Our Zero-Downtime Migration Playbook"
date: "2025-12-08"
excerpt: "Moving 40M rows across databases without dropping a single request. Dual-write strategies, shadow traffic, and the scripts that saved us at 2 AM."
category: "DevOps"
---

Last quarter, we migrated our primary datastore from a self-managed PostgreSQL cluster to a managed service. Forty million rows, 200+ queries to audit, and a hard requirement: zero downtime.

Here's exactly how we did it.

## Phase 1: Dual Writes

Before touching any read paths, we set up dual writes. Every mutation went to both the old and new database. This gave us confidence that the new database was receiving correct data before we trusted it for reads.

```python
async def create_order(order: Order):
    # Write to old DB (source of truth)
    result = await old_db.insert(order)
    
    # Write to new DB (async, non-blocking)
    try:
        await new_db.insert(order)
    except Exception as e:
        logger.error(f"Dual-write failed: {e}")
        metrics.increment("dual_write.failure")
    
    return result
```

The key insight: **the old database remains the source of truth** during this phase. If the new write fails, we log it and move on. We ran a reconciliation job nightly to catch and fix any discrepancies.

## Phase 2: Shadow Reads

Once dual writes were stable for two weeks, we started shadow reads. Every read query ran against both databases, but we only returned results from the old one. We compared the results in the background.

This caught three query translation bugs that would have caused incorrect results in production.

## Phase 3: The Cutover

After shadow reads showed 99.99% consistency for a week, we flipped the read path. The new database became the source of truth for reads, while dual writes continued.

We kept the old database running for another month as a safety net, then decommissioned it.

## What We Got Wrong

- **Underestimated schema differences**: Column defaults and null handling behaved differently between versions. Cost us three days.
- **Forgot about sequences**: Auto-increment IDs in the new database started at 1, not at the max ID from the old database. Nearly caused primary key collisions.
- **Connection pool sizing**: The new managed service had different connection limits. Our app tried to open 500 connections; the new DB allowed 100.

## The Playbook Summary

1. Set up dual writes (old DB is source of truth)
2. Run nightly reconciliation
3. Add shadow reads and compare results
4. Flip reads to new DB when consistency is proven
5. Keep old DB as fallback for 2-4 weeks
6. Decommission

This pattern works for any database migration. The total effort was about six weeks, but we didn't lose a single request.
