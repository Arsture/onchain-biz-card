// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OnchainBizCard is ERC721, Ownable {
    uint256 private _nextTokenId = 1;  // Counters 없이 단순 ++

    /* --- ① constructor  ----------------------------------- */
    constructor()
    ERC721("On-chain Business Card", "OCBC")
    Ownable(msg.sender)          // ✨ Owner = 배포 지갑
    {}

    /* --- ② 앞으로 구현할 함수 자리 -------------------------- */
}
