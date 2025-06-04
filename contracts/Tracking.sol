// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Shipment Tracking Smart Contract
/// @notice This contract allows users to create, manage, and track the lifecycle of shipments.
/// @dev Includes lifecycle events, payments, and historical logging.

contract Tracking {
    // Enum representing the possible statuses of a shipment.
    enum ShipmentStatus { PENDING, IN_TRANSIT, DELIVERED }

    // Struct representing the core details of a shipment.
    struct Shipment {
        address sender;           // Address of the shipment sender
        address receiver;         // Address of the shipment receiver
        uint256 pickupTime;       // Scheduled pickup timestamp
        uint256 deliveryTime;     // Actual delivery timestamp (0 until delivered)
        uint256 distance;         // Distance to deliver (in meters or km, unit-defined externally)
        uint256 price;            // Price of the shipment (in wei)
        ShipmentStatus status;    // Current status of the shipment
        bool isPaid;              // Whether the payment to the sender has been made
    }

    // Mapping from sender address to a list of their shipments.
    mapping(address => Shipment[]) public shipments;

    // Counter tracking the total number of shipments ever created.
    uint256 public shipmentCount;

    // Struct used for maintaining a flat global list of all shipments (not grouped by sender).
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

    // Global array that stores all shipments across all users.
    TypeShipment[] typeShipments;

    // Event emitted when a new shipment is created.
    event ShipmentCreated(
        address indexed sender, 
        address indexed receiver, 
        uint256 pickupTime, 
        uint256 distance, 
        uint256 price
    );

    // Event emitted when a shipment starts transport.
    event ShipmentTransported(
        address indexed sender, 
        address indexed receiver, 
        uint256 pickupTime
    );

    // Event emitted when a shipment is marked as delivered.
    event ShipmentDelivered(
        address indexed sender, 
        address indexed receiver, 
        uint256 deliveryTime
    );

    // Event emitted when the shipment payment is completed to the sender.
    event ShipmentPaid(
        address indexed sender, 
        address indexed receiver, 
        uint256 amount
    );

    /// @notice Constructor initializes shipment counter
    constructor() {
        shipmentCount = 0;
    }

    /// @notice Allows a sender to create a new shipment by paying the shipment fee.
    /// @param _receiver The address of the receiver.
    /// @param _pickupTime The timestamp for scheduled pickup.
    /// @param _distance The delivery distance.
    /// @param _price The cost for the shipment (must be sent with transaction).
    function createShipment(
        address _receiver, 
        uint256 _pickupTime, 
        uint256 _distance, 
        uint256 _price
    ) public payable {
        require(msg.value == _price, "Payment amount must match the price");

        // Create a new shipment and append to sender's shipment list.
        Shipment memory shipment = Shipment(
            msg.sender,
            _receiver,
            _pickupTime,
            0,
            _distance,
            _price,
            ShipmentStatus.PENDING,
            false
        );

        shipments[msg.sender].push(shipment);
        shipmentCount++;

        // Also add this shipment to the global flat list.
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

    /// @notice Starts shipment delivery; only valid if shipment is still pending.
    /// @param _sender The address of the sender (needed for lookup).
    /// @param _receiver The address of the receiver (used for verification).
    /// @param _index The index of the shipment in sender's list.
    function startShipment(address _sender, address _receiver, uint256 _index) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];

        require(shipment.receiver == _receiver, "Invalid receiver");
        require(shipment.status == ShipmentStatus.PENDING, "Shipment already started");

        // Update both mapping and global array status
        shipment.status = ShipmentStatus.IN_TRANSIT;
        typeShipment.status = ShipmentStatus.IN_TRANSIT;

        emit ShipmentTransported(_sender, _receiver, shipment.pickupTime);
    }

    /// @notice Marks a shipment as delivered and pays the sender.
    /// @param _sender The address of the shipment sender.
    /// @param _receiver The address of the shipment receiver.
    /// @param _index The index of the shipment in sender's list.
    function completeShipment(address _sender, address _receiver, uint256 _index) public {
        Shipment storage shipment = shipments[_sender][_index];
        TypeShipment storage typeShipment = typeShipments[_index];

        require(shipment.receiver == _receiver, "Invalid receiver");
        require(shipment.status == ShipmentStatus.IN_TRANSIT, "Shipment not in transit");
        require(!shipment.isPaid, "Shipment already paid");

        // Mark shipment as delivered and set delivery timestamp.
        shipment.status = ShipmentStatus.DELIVERED;
        shipment.deliveryTime = block.timestamp;

        typeShipment.status = ShipmentStatus.DELIVERED;
        typeShipment.deliveryTime = block.timestamp;

        // Transfer the payment to the sender
        uint256 amount = shipment.price;
        payable(shipment.sender).transfer(amount);

        shipment.isPaid = true;
        typeShipment.isPaid = true;

        emit ShipmentPaid(_sender, _receiver, amount);
        emit ShipmentDelivered(_sender, _receiver, shipment.deliveryTime);
    }

    /// @notice Retrieves detailed info about a specific shipment.
    /// @param _sender The address of the shipment sender.
    /// @param _index Index of the shipment in the sender's list.
    /// @return All key fields of the shipment struct.
    function getShipment(address _sender, uint256 _index) 
        public 
        view 
        returns (
            address,
            address,
            uint256,
            uint256,
            uint256,
            uint256,
            ShipmentStatus,
            bool
        ) 
    {
        Shipment memory shipment = shipments[_sender][_index];
        return (
            shipment.sender,
            shipment.receiver,
            shipment.pickupTime,
            shipment.deliveryTime,
            shipment.distance,
            shipment.price,
            shipment.status,
            shipment.isPaid
        );
    }

    /// @notice Returns the number of shipments created by a sender.
    /// @param _sender Address of the sender.
    /// @return Length of the shipment array for the sender.
    function getShipmentCount(address _sender) public view returns (uint256){
        return shipments[_sender].length;
    }

    /// @notice Returns all shipments stored in the global array.
    /// @return An array of TypeShipment structs.
    function getAllShipments() public view returns (TypeShipment[] memory) {
        return typeShipments;
    }
}