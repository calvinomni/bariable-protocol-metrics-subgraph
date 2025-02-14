import { Address, BigInt } from "@graphprotocol/graph-ts";

import { AuraLocker } from "../../generated/ProtocolMetrics/AuraLocker";
import { AuraStaking } from "../../generated/ProtocolMetrics/AuraStaking";
import { AuraVirtualBalanceRewardPool } from "../../generated/ProtocolMetrics/AuraVirtualBalanceRewardPool";
import { BalancerLiquidityGauge } from "../../generated/ProtocolMetrics/BalancerLiquidityGauge";
import { ConvexBaseRewardPool } from "../../generated/ProtocolMetrics/ConvexBaseRewardPool";
import { FraxFarm } from "../../generated/ProtocolMetrics/FraxFarm";
import { LQTYStaking } from "../../generated/ProtocolMetrics/LQTYStaking";
import { TokemakStaking } from "../../generated/ProtocolMetrics/TokemakStaking";
import { StakingPoolSnapshot } from "../../generated/schema";

export function getOrCreateBalancerGaugeStakingPoolSnapshot(address: string, blockNumber: BigInt): StakingPoolSnapshot {
    const snapshotId = `BalancerGauge/${address.toLowerCase()}/${blockNumber.toString()}`;
    let snapshot = StakingPoolSnapshot.load(snapshotId);
    if (snapshot == null) {
        snapshot = new StakingPoolSnapshot(snapshotId);
        snapshot.block = blockNumber;
        snapshot.contractAddress = Address.fromString(address);

        // Get the token that is staked
        const gaugeContract = BalancerLiquidityGauge.bind(Address.fromBytes(snapshot.contractAddress));
        const lpTokenResult = gaugeContract.try_lp_token();
        if (!lpTokenResult.reverted) {
            snapshot.stakingToken = lpTokenResult.value;
        }

        snapshot.save();
    }

    return snapshot;
}

export function getOrCreateAuraStakingPoolSnapshot(address: string, blockNumber: BigInt): StakingPoolSnapshot {
    const snapshotId = `AuraStaking/${address.toLowerCase()}/${blockNumber.toString()}`;
    let snapshot = StakingPoolSnapshot.load(snapshotId);
    if (snapshot == null) {
        snapshot = new StakingPoolSnapshot(snapshotId);
        snapshot.block = blockNumber;
        snapshot.contractAddress = Address.fromString(address);

        // Get the token that is staked
        const stakingContract = AuraStaking.bind(Address.fromBytes(snapshot.contractAddress));
        const stakingTokenResult = stakingContract.try_stakingToken();
        if (!stakingTokenResult.reverted) {
            snapshot.stakingToken = stakingTokenResult.value;
        }

        snapshot.save();
    }

    return snapshot;
}

export function getOrCreateConvexStakingPoolSnapshot(address: string, blockNumber: BigInt): StakingPoolSnapshot {
    const snapshotId = `ConvexStaking/${address.toLowerCase()}/${blockNumber.toString()}`;
    let snapshot = StakingPoolSnapshot.load(snapshotId);
    if (snapshot == null) {
        snapshot = new StakingPoolSnapshot(snapshotId);
        snapshot.block = blockNumber;
        snapshot.contractAddress = Address.fromString(address);

        // Get the token that is staked
        const rewardContract = ConvexBaseRewardPool.bind(Address.fromBytes(snapshot.contractAddress));
        const stakingTokenResult = rewardContract.try_stakingToken();
        if (!stakingTokenResult.reverted) {
            snapshot.stakingToken = stakingTokenResult.value;
        }

        snapshot.save();
    }

    return snapshot;
}

export function getOrCreateFraxStakingPoolSnapshot(address: string, blockNumber: BigInt): StakingPoolSnapshot {
    const snapshotId = `FraxStaking/${address.toLowerCase()}/${blockNumber.toString()}`;
    let snapshot = StakingPoolSnapshot.load(snapshotId);
    if (snapshot == null) {
        snapshot = new StakingPoolSnapshot(snapshotId);
        snapshot.block = blockNumber;
        snapshot.contractAddress = Address.fromString(address);

        // Get the token that is staked
        const rewardContract = FraxFarm.bind(Address.fromBytes(snapshot.contractAddress));
        const stakingTokenResult = rewardContract.try_stakingToken();
        if (!stakingTokenResult.reverted) {
            snapshot.stakingToken = stakingTokenResult.value;
        }

        snapshot.save();
    }

    return snapshot;
}

export function getOrCreateAuraRewardPoolSnapshot(address: string, blockNumber: BigInt): StakingPoolSnapshot {
    const snapshotId = `AuraReward/${address.toLowerCase()}/${blockNumber.toString()}`;
    let snapshot = StakingPoolSnapshot.load(snapshotId);
    if (snapshot == null) {
        snapshot = new StakingPoolSnapshot(snapshotId);
        snapshot.block = blockNumber;
        snapshot.contractAddress = Address.fromString(address);

        // Get the token that is the reward
        const rewardContract = AuraVirtualBalanceRewardPool.bind(Address.fromBytes(snapshot.contractAddress));
        const stakingTokenResult = rewardContract.try_rewardToken();
        if (!stakingTokenResult.reverted) {
            snapshot.stakingToken = stakingTokenResult.value;
        }

        snapshot.save();
    }

    return snapshot;
}

export function getOrCreateLiquityStakingPoolSnapshot(address: string, blockNumber: BigInt): StakingPoolSnapshot {
    const snapshotId = `LiquityStaking/${address.toLowerCase()}/${blockNumber.toString()}`;
    let snapshot = StakingPoolSnapshot.load(snapshotId);
    if (snapshot == null) {
        snapshot = new StakingPoolSnapshot(snapshotId);
        snapshot.block = blockNumber;
        snapshot.contractAddress = Address.fromString(address);

        // Get the token that is staked
        const rewardContract = LQTYStaking.bind(Address.fromBytes(snapshot.contractAddress));
        const stakingTokenResult = rewardContract.try_lqtyToken();
        if (!stakingTokenResult.reverted) {
            snapshot.stakingToken = stakingTokenResult.value;
        }

        snapshot.save();
    }

    return snapshot;
}

export function getOrCreateTokemakStakingPoolSnapshot(address: string, blockNumber: BigInt): StakingPoolSnapshot {
    const snapshotId = `TokemakStaking/${address.toLowerCase()}/${blockNumber.toString()}`;
    let snapshot = StakingPoolSnapshot.load(snapshotId);
    if (snapshot == null) {
        snapshot = new StakingPoolSnapshot(snapshotId);
        snapshot.block = blockNumber;
        snapshot.contractAddress = Address.fromString(address);

        // Get the token that is staked
        const rewardContract = TokemakStaking.bind(Address.fromBytes(snapshot.contractAddress));
        const stakingTokenResult = rewardContract.try_tokeToken();
        if (!stakingTokenResult.reverted) {
            snapshot.stakingToken = stakingTokenResult.value;
        }

        snapshot.save();
    }

    return snapshot;
}

export function getOrCreateAuraLockedPoolSnapshot(address: string, blockNumber: BigInt): StakingPoolSnapshot {
    const snapshotId = `AuraLocked/${address.toLowerCase()}/${blockNumber.toString()}`;
    let snapshot = StakingPoolSnapshot.load(snapshotId);
    if (snapshot == null) {
        snapshot = new StakingPoolSnapshot(snapshotId);
        snapshot.block = blockNumber;
        snapshot.contractAddress = Address.fromString(address);

        // Get the token that is staked
        const rewardContract = AuraLocker.bind(Address.fromBytes(snapshot.contractAddress));
        const stakingTokenResult = rewardContract.try_stakingToken();
        if (!stakingTokenResult.reverted) {
            snapshot.stakingToken = stakingTokenResult.value;
        }

        snapshot.save();
    }

    return snapshot;
}
