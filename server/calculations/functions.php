<?php

function calculateEOQ(array $product): float
{
    $dailyDemand = (float) $product["daily_demand"];
    $orderingCost = (float) $product["ordering_cost"];
    $holdingCost = (float) $product["holding_cost"];

    if ($dailyDemand <= 0 || $orderingCost < 0 || $holdingCost <= 0) {
        return 0;
    }

    $annualDemand = $dailyDemand * 365;

    return round(
        sqrt((2 * $annualDemand * $orderingCost) / $holdingCost)
    );
}

function calculateEOI(array $product): float
{
    $dailyDemand = (float) $product["daily_demand"];

    if ($dailyDemand <= 0) {
        return 0;
    }

    $annualDemand = $dailyDemand * 365;
    $eoq = calculateEOQ($product);

    return round(($eoq / $annualDemand) * 365);
}

function calculateROP(array $product): float
{
    $dailyDemand = (float) $product["daily_demand"];
    $leadTime = (float) $product["lead_time"];

    return $dailyDemand * $leadTime;
}


function calculateDayOfStockRemaining(array $product){
    $stock = $product["stock"];
    $dailyDemand = $product["daily_demand"];

    return round($stock / $dailyDemand);
}
