// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";      // ★ 새로 추가

contract OnchainBizCard is ERC721, Ownable {
    struct CardInfo {
        string name;
        string title;
        string contact;
        string website;
    }

    uint256 private _nextTokenId = 1;
    mapping(uint256 => CardInfo) private _cards;

    constructor()
    ERC721("On-chain Business Card", "OCBC")
    Ownable(msg.sender)
    {}

    /*─────────── mintCard (Step 2 완성) ───────────*/
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

    /*──────────────────────────────────────────────*/
    /*                     NEW                       */
    /*──────────────────────────────────────────────*/

    /** SVG 생성 */
    function _buildSVG(CardInfo memory c)
    internal
    pure
    returns (string memory)
    {
        return string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="320" style="font-family:monospace">',
                '<rect width="100%" height="100%" fill="#181818" rx="24"/>',
                '<text x="50%" y="35%" fill="#FAFAFA" font-size="34" text-anchor="middle">', c.name, '</text>',
                '<text x="50%" y="50%" fill="#BBBBBB" font-size="20" text-anchor="middle">', c.title, '</text>',
                '<text x="50%" y="65%" fill="#64D9FF" font-size="18" text-anchor="middle">', c.contact, '</text>',
                '<text x="50%" y="78%" fill="#FFD369" font-size="16" text-anchor="middle">', c.website, '</text>',
                '</svg>'
            )
        );
    }

    /** EIP-721 metadata */
    function tokenURI(uint256 tokenId)
    public
    view
    override
    returns (string memory)
    {
        require(_ownerOf(tokenId) != address(0), "ERC721: invalid token");
        CardInfo memory c = _cards[tokenId];

        /* 1) SVG → Base64 */
        string memory svg = _buildSVG(c);
        string memory img = string.concat(
            "data:image/svg+xml;base64,",
            Base64.encode(bytes(svg))
        );

        /* 2) JSON → Base64 */
        string memory json = string.concat(
            '{"name":"', c.name,
            '","description":"On-chain Business Card NFT",',
            '"image":"', img, '"}'
        );

        return string.concat(
            "data:application/json;base64,",
            Base64.encode(bytes(json))
        );
    }
}
