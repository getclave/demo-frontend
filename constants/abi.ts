export const ABIs = {
    webauthnContract: [
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'previousOwner',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'newOwner',
                    type: 'address',
                },
            ],
            name: 'OwnershipTransferred',
            type: 'event',
        },
        {
            inputs: [],
            name: 'renounceOwnership',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'newOwner',
                    type: 'address',
                },
            ],
            name: 'transferOwnership',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bytes',
                    name: '_signature',
                    type: 'bytes',
                },
            ],
            name: '_decodeSignature',
            outputs: [
                {
                    internalType: 'bytes',
                    name: '',
                    type: 'bytes',
                },
                {
                    internalType: 'bytes1',
                    name: '',
                    type: 'bytes1',
                },
                {
                    internalType: 'bytes',
                    name: '',
                    type: 'bytes',
                },
                {
                    internalType: 'string',
                    name: '',
                    type: 'string',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256[2]',
                    name: '',
                    type: 'uint256[2]',
                },
                {
                    internalType: 'uint256[2]',
                    name: '',
                    type: 'uint256[2]',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bytes',
                    name: 'authenticatorData',
                    type: 'bytes',
                },
                {
                    internalType: 'bytes1',
                    name: 'authenticatorDataFlagMask',
                    type: 'bytes1',
                },
                {
                    internalType: 'bytes',
                    name: 'clientData',
                    type: 'bytes',
                },
                {
                    internalType: 'string',
                    name: 'clientChallenge',
                    type: 'string',
                },
                {
                    internalType: 'uint256',
                    name: 'clientChallengeDataOffset',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256[2]',
                    name: 'rs',
                    type: 'uint256[2]',
                },
                {
                    internalType: 'uint256[2]',
                    name: 'coordinates',
                    type: 'uint256[2]',
                },
            ],
            name: '_verifySignature',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'x0',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y0',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'x1',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y1',
                    type: 'uint256',
                },
            ],
            name: 'add',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'x1',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y1',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'x2',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y2',
                    type: 'uint256',
                },
            ],
            name: 'addAndReturnProjectivePoint',
            outputs: [
                {
                    internalType: 'uint256[3]',
                    name: 'P',
                    type: 'uint256[3]',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'x0',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y0',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'z0',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'x1',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y1',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'z1',
                    type: 'uint256',
                },
            ],
            name: 'addProj',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'x2',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y2',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'z2',
                    type: 'uint256',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'x',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y',
                    type: 'uint256',
                },
            ],
            name: 'isOnCurve',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bytes',
                    name: 'transaction',
                    type: 'bytes',
                },
                {
                    internalType: 'bytes',
                    name: '_signature',
                    type: 'bytes',
                },
            ],
            name: 'isValidSignature',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'x0',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y0',
                    type: 'uint256',
                },
            ],
            name: 'isZeroCurve',
            outputs: [
                {
                    internalType: 'bool',
                    name: 'isZero',
                    type: 'bool',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'x0',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y0',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'scalar',
                    type: 'uint256',
                },
            ],
            name: 'multiplyScalar',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'x1',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y1',
                    type: 'uint256',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [],
            name: 'owner',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'x0',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y0',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'z0',
                    type: 'uint256',
                },
            ],
            name: 'toAffinePoint',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'x1',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y1',
                    type: 'uint256',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'x0',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y0',
                    type: 'uint256',
                },
            ],
            name: 'toProjectivePoint',
            outputs: [
                {
                    internalType: 'uint256[3]',
                    name: 'P',
                    type: 'uint256[3]',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'x0',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y0',
                    type: 'uint256',
                },
            ],
            name: 'twice',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'x0',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y0',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'z0',
                    type: 'uint256',
                },
            ],
            name: 'twiceProj',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'x1',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y1',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'z1',
                    type: 'uint256',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bytes32',
                    name: 'message',
                    type: 'bytes32',
                },
                {
                    internalType: 'uint256[2]',
                    name: 'rs',
                    type: 'uint256[2]',
                },
                {
                    internalType: 'uint256[2]',
                    name: 'Q',
                    type: 'uint256[2]',
                },
            ],
            name: 'validateSignature',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [],
            name: 'zeroAffine',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'x',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y',
                    type: 'uint256',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [],
            name: 'zeroProj',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'x',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'y',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'z',
                    type: 'uint256',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
    ],
    entrypointContract: [
        {
            inputs: [
                { internalType: 'uint256', name: 'preOpGas', type: 'uint256' },
                { internalType: 'uint256', name: 'paid', type: 'uint256' },
                { internalType: 'uint48', name: 'validAfter', type: 'uint48' },
                { internalType: 'uint48', name: 'validUntil', type: 'uint48' },
                { internalType: 'bool', name: 'targetSuccess', type: 'bool' },
                { internalType: 'bytes', name: 'targetResult', type: 'bytes' },
            ],
            name: 'ExecutionResult',
            type: 'error',
        },
        {
            inputs: [
                { internalType: 'uint256', name: 'opIndex', type: 'uint256' },
                { internalType: 'string', name: 'reason', type: 'string' },
            ],
            name: 'FailedOp',
            type: 'error',
        },
        {
            inputs: [
                { internalType: 'address', name: 'sender', type: 'address' },
            ],
            name: 'SenderAddressResult',
            type: 'error',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'aggregator',
                    type: 'address',
                },
            ],
            name: 'SignatureValidationFailed',
            type: 'error',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'preOpGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'prefund',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bool',
                            name: 'sigFailed',
                            type: 'bool',
                        },
                        {
                            internalType: 'uint48',
                            name: 'validAfter',
                            type: 'uint48',
                        },
                        {
                            internalType: 'uint48',
                            name: 'validUntil',
                            type: 'uint48',
                        },
                        {
                            internalType: 'bytes',
                            name: 'paymasterContext',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct IEntryPoint.ReturnInfo',
                    name: 'returnInfo',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'stake',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'unstakeDelaySec',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct IStakeManager.StakeInfo',
                    name: 'senderInfo',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'stake',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'unstakeDelaySec',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct IStakeManager.StakeInfo',
                    name: 'factoryInfo',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'stake',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'unstakeDelaySec',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct IStakeManager.StakeInfo',
                    name: 'paymasterInfo',
                    type: 'tuple',
                },
            ],
            name: 'ValidationResult',
            type: 'error',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'preOpGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'prefund',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bool',
                            name: 'sigFailed',
                            type: 'bool',
                        },
                        {
                            internalType: 'uint48',
                            name: 'validAfter',
                            type: 'uint48',
                        },
                        {
                            internalType: 'uint48',
                            name: 'validUntil',
                            type: 'uint48',
                        },
                        {
                            internalType: 'bytes',
                            name: 'paymasterContext',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct IEntryPoint.ReturnInfo',
                    name: 'returnInfo',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'stake',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'unstakeDelaySec',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct IStakeManager.StakeInfo',
                    name: 'senderInfo',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'stake',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'unstakeDelaySec',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct IStakeManager.StakeInfo',
                    name: 'factoryInfo',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'stake',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'unstakeDelaySec',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct IStakeManager.StakeInfo',
                    name: 'paymasterInfo',
                    type: 'tuple',
                },
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'aggregator',
                            type: 'address',
                        },
                        {
                            components: [
                                {
                                    internalType: 'uint256',
                                    name: 'stake',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'unstakeDelaySec',
                                    type: 'uint256',
                                },
                            ],
                            internalType: 'struct IStakeManager.StakeInfo',
                            name: 'stakeInfo',
                            type: 'tuple',
                        },
                    ],
                    internalType: 'struct IEntryPoint.AggregatorStakeInfo',
                    name: 'aggregatorInfo',
                    type: 'tuple',
                },
            ],
            name: 'ValidationResultWithAggregation',
            type: 'error',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'bytes32',
                    name: 'userOpHash',
                    type: 'bytes32',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'sender',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'factory',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'paymaster',
                    type: 'address',
                },
            ],
            name: 'AccountDeployed',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [],
            name: 'BeforeExecution',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'account',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'totalDeposit',
                    type: 'uint256',
                },
            ],
            name: 'Deposited',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'aggregator',
                    type: 'address',
                },
            ],
            name: 'SignatureAggregatorChanged',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'account',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'totalStaked',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'unstakeDelaySec',
                    type: 'uint256',
                },
            ],
            name: 'StakeLocked',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'account',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'withdrawTime',
                    type: 'uint256',
                },
            ],
            name: 'StakeUnlocked',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'account',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'withdrawAddress',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'StakeWithdrawn',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'bytes32',
                    name: 'userOpHash',
                    type: 'bytes32',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'sender',
                    type: 'address',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'paymaster',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'bool',
                    name: 'success',
                    type: 'bool',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'actualGasCost',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'actualGasUsed',
                    type: 'uint256',
                },
            ],
            name: 'UserOperationEvent',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'bytes32',
                    name: 'userOpHash',
                    type: 'bytes32',
                },
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'sender',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'nonce',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'bytes',
                    name: 'revertReason',
                    type: 'bytes',
                },
            ],
            name: 'UserOperationRevertReason',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: 'address',
                    name: 'account',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'withdrawAddress',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'Withdrawn',
            type: 'event',
        },
        {
            inputs: [],
            name: 'SIG_VALIDATION_FAILED',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'bytes', name: 'initCode', type: 'bytes' },
                { internalType: 'address', name: 'sender', type: 'address' },
                {
                    internalType: 'bytes',
                    name: 'paymasterAndData',
                    type: 'bytes',
                },
            ],
            name: '_validateSenderAndPaymaster',
            outputs: [],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint32',
                    name: 'unstakeDelaySec',
                    type: 'uint32',
                },
            ],
            name: 'addStake',
            outputs: [],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address', name: 'account', type: 'address' },
            ],
            name: 'balanceOf',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address', name: 'account', type: 'address' },
            ],
            name: 'depositTo',
            outputs: [],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: '', type: 'address' }],
            name: 'deposits',
            outputs: [
                { internalType: 'uint112', name: 'deposit', type: 'uint112' },
                { internalType: 'bool', name: 'staked', type: 'bool' },
                { internalType: 'uint112', name: 'stake', type: 'uint112' },
                {
                    internalType: 'uint32',
                    name: 'unstakeDelaySec',
                    type: 'uint32',
                },
                {
                    internalType: 'uint48',
                    name: 'withdrawTime',
                    type: 'uint48',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address', name: 'account', type: 'address' },
            ],
            name: 'getDepositInfo',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint112',
                            name: 'deposit',
                            type: 'uint112',
                        },
                        { internalType: 'bool', name: 'staked', type: 'bool' },
                        {
                            internalType: 'uint112',
                            name: 'stake',
                            type: 'uint112',
                        },
                        {
                            internalType: 'uint32',
                            name: 'unstakeDelaySec',
                            type: 'uint32',
                        },
                        {
                            internalType: 'uint48',
                            name: 'withdrawTime',
                            type: 'uint48',
                        },
                    ],
                    internalType: 'struct IStakeManager.DepositInfo',
                    name: 'info',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address', name: 'sender', type: 'address' },
                { internalType: 'uint192', name: 'key', type: 'uint192' },
            ],
            name: 'getNonce',
            outputs: [
                { internalType: 'uint256', name: 'nonce', type: 'uint256' },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'bytes', name: 'initCode', type: 'bytes' },
            ],
            name: 'getSenderAddress',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'sender',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'nonce',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'initCode',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                        {
                            internalType: 'uint256',
                            name: 'callGasLimit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'verificationGasLimit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'preVerificationGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxFeePerGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxPriorityFeePerGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'paymasterAndData',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bytes',
                            name: 'signature',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct UserOperation',
                    name: 'userOp',
                    type: 'tuple',
                },
            ],
            name: 'getUserOpHash',
            outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            components: [
                                {
                                    internalType: 'address',
                                    name: 'sender',
                                    type: 'address',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'nonce',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'bytes',
                                    name: 'initCode',
                                    type: 'bytes',
                                },
                                {
                                    internalType: 'bytes',
                                    name: 'callData',
                                    type: 'bytes',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'callGasLimit',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'verificationGasLimit',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'preVerificationGas',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'maxFeePerGas',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'maxPriorityFeePerGas',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'bytes',
                                    name: 'paymasterAndData',
                                    type: 'bytes',
                                },
                                {
                                    internalType: 'bytes',
                                    name: 'signature',
                                    type: 'bytes',
                                },
                            ],
                            internalType: 'struct UserOperation[]',
                            name: 'userOps',
                            type: 'tuple[]',
                        },
                        {
                            internalType: 'contract IAggregator',
                            name: 'aggregator',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'signature',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct IEntryPoint.UserOpsPerAggregator[]',
                    name: 'opsPerAggregator',
                    type: 'tuple[]',
                },
                {
                    internalType: 'address payable',
                    name: 'beneficiary',
                    type: 'address',
                },
            ],
            name: 'handleAggregatedOps',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'sender',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'nonce',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'initCode',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                        {
                            internalType: 'uint256',
                            name: 'callGasLimit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'verificationGasLimit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'preVerificationGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxFeePerGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxPriorityFeePerGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'paymasterAndData',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bytes',
                            name: 'signature',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct UserOperation[]',
                    name: 'ops',
                    type: 'tuple[]',
                },
                {
                    internalType: 'address payable',
                    name: 'beneficiary',
                    type: 'address',
                },
            ],
            name: 'handleOps',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint192', name: 'key', type: 'uint192' }],
            name: 'incrementNonce',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'bytes', name: 'callData', type: 'bytes' },
                {
                    components: [
                        {
                            components: [
                                {
                                    internalType: 'address',
                                    name: 'sender',
                                    type: 'address',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'nonce',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'callGasLimit',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'verificationGasLimit',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'preVerificationGas',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'address',
                                    name: 'paymaster',
                                    type: 'address',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'maxFeePerGas',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'maxPriorityFeePerGas',
                                    type: 'uint256',
                                },
                            ],
                            internalType: 'struct EntryPoint.MemoryUserOp',
                            name: 'mUserOp',
                            type: 'tuple',
                        },
                        {
                            internalType: 'bytes32',
                            name: 'userOpHash',
                            type: 'bytes32',
                        },
                        {
                            internalType: 'uint256',
                            name: 'prefund',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'contextOffset',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'preOpGas',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct EntryPoint.UserOpInfo',
                    name: 'opInfo',
                    type: 'tuple',
                },
                { internalType: 'bytes', name: 'context', type: 'bytes' },
            ],
            name: 'innerHandleOp',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'actualGasCost',
                    type: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                { internalType: 'address', name: '', type: 'address' },
                { internalType: 'uint192', name: '', type: 'uint192' },
            ],
            name: 'nonceSequenceNumber',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'sender',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'nonce',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'initCode',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                        {
                            internalType: 'uint256',
                            name: 'callGasLimit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'verificationGasLimit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'preVerificationGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxFeePerGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxPriorityFeePerGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'paymasterAndData',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bytes',
                            name: 'signature',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct UserOperation',
                    name: 'op',
                    type: 'tuple',
                },
                { internalType: 'address', name: 'target', type: 'address' },
                {
                    internalType: 'bytes',
                    name: 'targetCallData',
                    type: 'bytes',
                },
            ],
            name: 'simulateHandleOp',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'sender',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'nonce',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'initCode',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                        {
                            internalType: 'uint256',
                            name: 'callGasLimit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'verificationGasLimit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'preVerificationGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxFeePerGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxPriorityFeePerGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'paymasterAndData',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bytes',
                            name: 'signature',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct UserOperation',
                    name: 'userOp',
                    type: 'tuple',
                },
            ],
            name: 'simulateValidation',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'unlockStake',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address payable',
                    name: 'withdrawAddress',
                    type: 'address',
                },
            ],
            name: 'withdrawStake',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address payable',
                    name: 'withdrawAddress',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'withdrawAmount',
                    type: 'uint256',
                },
            ],
            name: 'withdrawTo',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        { stateMutability: 'payable', type: 'receive' },
    ],
    sealAccountContract: [
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_entryPointAddress',
                    type: 'address',
                },
                {
                    internalType: 'bytes',
                    name: 'initialValidQ',
                    type: 'bytes',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'constructor',
        },
        {
            inputs: [
                {
                    internalType: 'bytes',
                    name: 'Q',
                    type: 'bytes',
                },
                {
                    internalType: 'bool',
                    name: 'valid',
                    type: 'bool',
                },
            ],
            name: 'authenticateQ',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'entryPoint',
            outputs: [
                {
                    internalType: 'contract IEntryPoint',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'dest',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes',
                    name: 'func',
                    type: 'bytes',
                },
            ],
            name: 'execute',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address[]',
                    name: 'dest',
                    type: 'address[]',
                },
                {
                    internalType: 'bytes[]',
                    name: 'func',
                    type: 'bytes[]',
                },
            ],
            name: 'executeBatch',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getNonce',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'uint256[]',
                    name: '',
                    type: 'uint256[]',
                },
                {
                    internalType: 'uint256[]',
                    name: '',
                    type: 'uint256[]',
                },
                {
                    internalType: 'bytes',
                    name: '',
                    type: 'bytes',
                },
            ],
            name: 'onERC1155BatchReceived',
            outputs: [
                {
                    internalType: 'bytes4',
                    name: '',
                    type: 'bytes4',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes',
                    name: '',
                    type: 'bytes',
                },
            ],
            name: 'onERC1155Received',
            outputs: [
                {
                    internalType: 'bytes4',
                    name: '',
                    type: 'bytes4',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes',
                    name: '',
                    type: 'bytes',
                },
            ],
            name: 'onERC721Received',
            outputs: [
                {
                    internalType: 'bytes4',
                    name: '',
                    type: 'bytes4',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bytes4',
                    name: 'interfaceId',
                    type: 'bytes4',
                },
            ],
            name: 'supportsInterface',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes',
                    name: '',
                    type: 'bytes',
                },
                {
                    internalType: 'bytes',
                    name: '',
                    type: 'bytes',
                },
            ],
            name: 'tokensReceived',
            outputs: [],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bytes',
                    name: '',
                    type: 'bytes',
                },
            ],
            name: 'validQs',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'sender',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'nonce',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'initCode',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                        {
                            internalType: 'uint256',
                            name: 'callGasLimit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'verificationGasLimit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'preVerificationGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxFeePerGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxPriorityFeePerGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'paymasterAndData',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bytes',
                            name: 'signature',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct UserOperation',
                    name: 'userOp',
                    type: 'tuple',
                },
                {
                    internalType: 'bytes32',
                    name: 'userOpHash',
                    type: 'bytes32',
                },
            ],
            name: 'validateSignature',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'validationData',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'sender',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'nonce',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'initCode',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                        {
                            internalType: 'uint256',
                            name: 'callGasLimit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'verificationGasLimit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'preVerificationGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxFeePerGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxPriorityFeePerGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'paymasterAndData',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bytes',
                            name: 'signature',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct UserOperation',
                    name: 'userOp',
                    type: 'tuple',
                },
                {
                    internalType: 'bytes32',
                    name: 'userOpHash',
                    type: 'bytes32',
                },
                {
                    internalType: 'uint256',
                    name: 'missingAccountFunds',
                    type: 'uint256',
                },
            ],
            name: 'validateUserOp',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'validationData',
                    type: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            stateMutability: 'payable',
            type: 'receive',
        },
    ],
    factoryContract: [
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes',
                    name: 'initializationCode',
                    type: 'bytes',
                },
            ],
            name: 'create',
            outputs: [
                {
                    internalType: 'address',
                    name: 'deploymentAddress',
                    type: 'address',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'salt',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes',
                    name: 'initCode',
                    type: 'bytes',
                },
            ],
            name: 'findCreate2Address',
            outputs: [
                {
                    internalType: 'address',
                    name: 'deploymentAddress',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
    ],
    verificationContract: [
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'sender',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'nonce',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'initCode',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                        {
                            internalType: 'uint256',
                            name: 'callGasLimit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'verificationGasLimit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'preVerificationGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxFeePerGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxPriorityFeePerGas',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'paymasterAndData',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bytes',
                            name: 'signature',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct UserOperation',
                    name: 'userOp',
                    type: 'tuple',
                },
                {
                    internalType: 'bytes32',
                    name: 'userOpHash',
                    type: 'bytes32',
                },
                {
                    internalType: 'bytes',
                    name: 'publicKey',
                    type: 'bytes',
                },
            ],
            name: 'validateSignature',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'validationData',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
    ],
    dbContract: [
        {
            inputs: [],
            name: 'isAlone',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'lastUpdate',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'update',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ],
};
