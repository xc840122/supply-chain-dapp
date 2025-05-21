// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tracking {
    // Enum representing shipment status
    enum ShipmentStatus { PENDING, IN_TRANSIT, DELIVERED }

    // Struct representing a shipment tied to a specific sender
    struct Shipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    // Mapping to store shipments by sender address
    mapping(address => Shipment[]) public shipments;

    // Total number of shipments created
    uint256 public shipmentCount;

    // A second struct to store a flat array of all shipments
    struct TypeShipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    // Array to store all shipments regardless of sender
    TypeShipment[] typeShipments;

    // Events to emit for different shipment lifecycle stages
    event ShipmentCreated(address indexed sender, address indexed receiver, uint256 pickupTime, 
        uint256 distance, uint256 price);
    event ShipmentTransported(address indexed sender, address indexed receiver, uint256 pickupTime);
    event ShipmentDelivered(address indexed sender, address indexed receiver, uint256 deliveryTime);
    event ShipmentPaid(address indexed sender, address indexed receiver, uint256 amount);

    // Constructor initializing shipment count
    constructor() {
        shipmentCount = 0;
    }

    // Function to create a new shipment
    function createShipment(
        address _receiver, 
        uint256 _pickupTime, 
        uint256 _distance, 
        uint256 _price
    ) public payable {
        // Require exact payment equal to price
        require(msg.value == _price, "Payment amount must match the price");

        // Create Shipment struct and push to mapping
        Shipment memory shipment = Shipment(
            msg.sender,
            _receiver,
            _pickupTime,
            0, // deliveryTime initially 0
            _distance,
            _price,
            ShipmentStatus.PENDING,
            false // isPaid initially false
        );

        shipments[msg.sender].push(shipment);
        shipmentCount++;

        // Also store in global array
        typeShipments.push(TypeShipment(
            msg.sender,
            _receiver,
            _pickupTime,
            0,
            _distance,
            _price,
            ShipmentStatus.PENDING,
            false
        ));

        emit ShipmentCreated(msg.sender, _receiver, _pickupTime, _distance, _price);
    }

    // Function to mark shipment as IN_TRANSIT
    function startShipment(address _sender, address _receiver, uint256 _index) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];

        require(shipment.receiver == _receiver, "Invalid receiver");
        require(shipment.status == ShipmentStatus.PENDING, "Shipment already started");

        shipment.status = ShipmentStatus.IN_TRANSIT;
        typeShipment.status = ShipmentStatus.IN_TRANSIT;

        emit ShipmentTransported(_sender, _receiver, shipment.pickupTime);
    }

    // Function to mark shipment as DELIVERED and pay the sender
    function completeShipment(address _sender, address _receiver, uint256 _index) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];

        require(shipment.receiver == _receiver, "Invalid receiver");
        require(shipment.status == ShipmentStatus.IN_TRANSIT, "Shipment not in transit");
        require(shipment.isPaid == false, "Shipment already paid");

        // Update status and delivery time
        shipment.status = ShipmentStatus.DELIVERED;
        typeShipment.status = ShipmentStatus.DELIVERED;

        shipment.deliveryTime = block.timestamp;
        typeShipment.deliveryTime = block.timestamp;

        // Pay sender and mark as paid
        uint256 amount = shipment.price;
        payable(shipment.sender).transfer(amount);

        shipment.isPaid = true;
        typeShipment.isPaid = true;

        emit ShipmentPaid(_sender, _receiver, amount);
        emit ShipmentDelivered(_sender, _receiver, shipment.deliveryTime);
    }
}
