// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OnchainBizCard is ERC721, Ownable {
    /*──────────────────
      1) 상태 저장소
    ──────────────────*/
    struct CardInfo {
        string name;
        string title;
        string contact;
        string website;
    }

    uint256 private _nextTokenId = 1;
    mapping(uint256 => CardInfo) private _cards;

    /*──────── constructor ────────*/
    constructor()
    ERC721("On-chain Business Card", "OCBC")
    Ownable(msg.sender)
    {}

    /*──────────────────
      2) 민팅 함수
    ──────────────────*/
    function mintCard(
        string calldata name,
        string calldata title,
        string calldata contact,
        string calldata website
    ) external returns (uint256 tokenId) {
        require(bytes(name).length > 0, "Name empty");

        tokenId = _nextTokenId++;
        _cards[tokenId] = CardInfo(name, title, contact, website);

        _safeMint(msg.sender, tokenId);
    }

    /*─── 앞으로 작성할: _buildSVG + tokenURI ───*/
}
