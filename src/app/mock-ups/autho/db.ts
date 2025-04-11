export class WorkOrderLineAuthorizationRepairItem {
  workOrderLineId?: string;
  id?: string;
  workOrderItemId?: string;
  name?: string;
  priceRangeMin?: number;
  priceRangeMax?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  createdById?: string;
  lastModifiedById?: string;
  deletedDate?: Date;
  companyNeverProvides?: boolean;
  salesItemCoverageAuthorizationRepairItemId?: string;
  overallLimit?: number;
  perUnitLimit?: number;


  static getItems(): WorkOrderLineAuthorizationRepairItem[] {
    return [
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "aef02d53-7137-491c-9b80-00b146fed16f",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Registers/grills",
        "priceRangeMin": 125,
        "priceRangeMax": 140,
        "createdDate": "2024-03-01T16:29:28.067Z",
        "lastModifiedDate": "2024-03-01T16:29:28.067Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "0a8ec300-f642-42cb-80da-02c38882d0fb",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Breaker Disconnect (30-60 amp fused)",
        "priceRangeMin": 100,
        "priceRangeMax": 120,
        "createdDate": "2024-03-01T16:17:47.367Z",
        "lastModifiedDate": "2024-03-01T16:17:47.367Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "693e440d-76a7-45b0-b127-19d988da47e8"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "c51113d0-24b9-47d4-bf44-02e8df308841",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Diagnosis (per hour)",
        "priceRangeMin": 60,
        "priceRangeMax": 85,
        "createdDate": "2024-03-01T16:22:32.360Z",
        "lastModifiedDate": "2024-03-01T16:22:32.360Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "21b07ed8-9c9c-4c0e-8b6c-f7768f5ae469"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "06fecdf9-2238-4b17-9610-02fd711ca62f",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Condenser Conduit",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:35:43.077Z",
        "lastModifiedDate": "2024-03-01T16:35:43.077Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "8065a388-01ab-42f5-b394-0307824c9f6f",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Blower Motor - 1075 RPM",
        "priceRangeMin": 210,
        "priceRangeMax": 320,
        "createdDate": "2024-03-01T16:14:33.013Z",
        "lastModifiedDate": "2024-03-01T16:14:33.013Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "299923b7-8a25-4277-a3d7-f2a11c0372da"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "66610114-d63a-4170-a941-031dd5e8a68b",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Expansion Valve / Metering Device - TXV Package Unit",
        "priceRangeMin": 440,
        "priceRangeMax": 460,
        "createdDate": "2024-03-01T16:24:11.983Z",
        "lastModifiedDate": "2024-03-01T16:24:11.983Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "9145e814-3fa9-455c-b930-a665578c15b5"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "a4f02bdd-835c-4821-a911-06ebbaa834a8",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Fan Blade",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:35:15.480Z",
        "lastModifiedDate": "2024-03-01T16:35:15.480Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "892642ef-c429-4736-bc30-9b22f3940550"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "38fc8313-459b-48a0-a809-0734c5484756",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Capacitor 7.5 + 50 to 7.5 + 65 UF (Dual)",
        "priceRangeMin": 135,
        "priceRangeMax": 150,
        "createdDate": "2024-03-01T16:19:47.297Z",
        "lastModifiedDate": "2024-03-01T16:19:47.297Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "301725ef-c9e1-4db9-be88-b1476568ca44"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "2bfa4226-ab51-4fc7-a9df-0ab264ca0da2",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "SW-Cutout HI Press",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:34:35.083Z",
        "lastModifiedDate": "2024-03-01T16:34:35.083Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "ba42f0ae-0f4e-4951-803b-c1e1e744c68d"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "2e903509-cc3b-480a-bc6a-0f8867e5d8dd",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Refrigerant Recovery",
        "priceRangeMin": 90,
        "priceRangeMax": 110,
        "createdDate": "2024-03-01T16:30:36.080Z",
        "lastModifiedDate": "2024-03-01T16:30:36.080Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "a2a045eb-00f0-46bf-b47f-10dc51aafc0f",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Expansion Valve / Metering Device - Piston Kit",
        "priceRangeMin": 225,
        "priceRangeMax": 250,
        "createdDate": "2024-03-01T16:23:41.037Z",
        "lastModifiedDate": "2024-03-01T16:23:41.037Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "f34769b3-c84e-4f43-9747-22521bff34e9"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "25e04d41-a29d-46e9-94d3-11470b664d99",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Shoulder Screw",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:34:39.877Z",
        "lastModifiedDate": "2024-03-01T16:34:39.877Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "19211da1-b2f4-4156-ae7b-137ccb14b5b9",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Contactor 3 Pole 3 Phase",
        "priceRangeMin": 160,
        "priceRangeMax": 175,
        "createdDate": "2024-03-01T16:22:17.527Z",
        "lastModifiedDate": "2024-03-01T16:22:17.527Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "bb0cb9bb-6f74-49d3-958a-5b3505e736d6"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "b0517a1b-bec1-4403-9018-13d83f6acaf7",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Time Delay",
        "priceRangeMin": 110,
        "priceRangeMax": 125,
        "createdDate": "2024-03-01T16:31:41.913Z",
        "lastModifiedDate": "2024-03-01T16:31:41.913Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "6d42acb9-4ef1-4f47-a147-763a93cd5b8a"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "d076cc81-38a2-4352-95cb-1542dc9f802a",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Venturi Ring",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:35:10.303Z",
        "lastModifiedDate": "2024-03-01T16:35:10.303Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "ac9e1e40-b61b-492e-8eca-177babb3f4ea",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Line Drier - Bi Flow",
        "priceRangeMin": 90,
        "priceRangeMax": 105,
        "createdDate": "2024-03-01T16:28:03.823Z",
        "lastModifiedDate": "2024-03-01T16:28:03.823Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "9ad121de-cf63-41c4-8eb0-c8c630018960"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "f260c88e-cc54-460c-a310-1a32b92fa494",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Line Drier - Suction Line",
        "priceRangeMin": 80,
        "priceRangeMax": 95,
        "createdDate": "2024-03-01T16:28:36.557Z",
        "lastModifiedDate": "2024-03-01T16:28:36.557Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "3a75d12e-c2e8-42c9-a9a0-ec64084ea2bf"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "c5f24c45-1070-456b-9975-2021d0e580d0",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Equipment Disposal",
        "priceRangeMin": 50,
        "priceRangeMax": 60,
        "createdDate": "2024-03-01T16:22:49.907Z",
        "lastModifiedDate": "2024-03-01T16:22:49.907Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "9a4e470e-4a79-486c-840c-2213ae61400a",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Filter Base",
        "priceRangeMin": 150,
        "priceRangeMax": 175,
        "createdDate": "2024-03-01T16:24:46.687Z",
        "lastModifiedDate": "2024-03-01T16:24:46.687Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "86311551-bf12-4f8c-9446-299b45050675",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Contactor 1.5 pole 30 amp",
        "priceRangeMin": 100,
        "priceRangeMax": 115,
        "createdDate": "2024-03-01T16:21:56.240Z",
        "lastModifiedDate": "2024-03-01T16:21:56.240Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "71b1d506-96d0-4e87-8c83-6a0d9e3c356b"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "764c1d92-2e66-4be5-aa84-302e43a85ebf",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Plenum",
        "priceRangeMin": 350,
        "priceRangeMax": 400,
        "createdDate": "2024-03-01T16:28:59.527Z",
        "lastModifiedDate": "2024-03-01T16:28:59.527Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "e55e2f42-5aff-4b6a-af66-306e3a46c0f8",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Secondary Drain Pans",
        "priceRangeMin": 125,
        "priceRangeMax": 150,
        "createdDate": "2024-03-01T16:31:12.900Z",
        "lastModifiedDate": "2024-03-01T16:31:12.900Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "1a10a569-0c72-492c-8536-67492740b95d"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "035e79e8-2ee2-43be-abe3-4004c85b07b1",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Transformer - 40 Volt",
        "priceRangeMin": 115,
        "priceRangeMax": 130,
        "createdDate": "2024-03-01T16:33:03.677Z",
        "lastModifiedDate": "2024-03-01T16:33:03.677Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "dce471e4-7864-4345-b54b-ee3b8e2ba119"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "dceb23e6-9f63-4124-ba21-40d50beaf445",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Float Switch",
        "priceRangeMin": 190,
        "priceRangeMax": 210,
        "createdDate": "2024-03-01T16:25:00.270Z",
        "lastModifiedDate": "2024-03-01T16:25:00.270Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "e0eb0057-31eb-4f5a-84df-49d2f7041d07",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Condenser Base pan",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:34:29.787Z",
        "lastModifiedDate": "2024-03-01T16:34:29.787Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "198766da-fa98-4250-8d34-49ff510a4d5f",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "King Valve - Suction Side",
        "priceRangeMin": 285,
        "priceRangeMax": 300,
        "createdDate": "2024-03-01T16:26:16.777Z",
        "lastModifiedDate": "2024-03-01T16:26:16.777Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "7b6c1e5d-5b3a-4e6f-8765-62a9535564dc"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "af2e899b-fd3f-4220-a598-4a762b31f5d3",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Schrader Valve Change Out",
        "priceRangeMin": 100,
        "priceRangeMax": 115,
        "createdDate": "2024-03-01T16:31:00.317Z",
        "lastModifiedDate": "2024-03-01T16:31:00.317Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "ad450ffc-3075-4ca5-afe4-4470fb303849"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "91cab311-e3f7-42da-b4ba-4fc10ef661d9",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "T-Stat Replacement - Smart",
        "priceRangeMin": 175,
        "priceRangeMax": 220,
        "createdDate": "2024-03-01T16:32:51.530Z",
        "lastModifiedDate": "2024-03-01T16:32:51.530Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "6ea6a0f8-c725-4595-8dd0-7c950c9af6b3"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "bc628ee5-c5f4-40cc-b642-509da92e9ddd",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Leak Stop",
        "priceRangeMin": 150,
        "priceRangeMax": 180,
        "createdDate": "2024-03-01T16:27:41.030Z",
        "lastModifiedDate": "2024-03-01T16:27:41.030Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "62796f75-0f1b-4b2a-b452-4aa807528bd9"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "89e4cac7-ba84-4f9e-9923-50c51ffcb854",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Capacitor 5 + 25 to 7.5 + 45 UF (Dual)",
        "priceRangeMin": 135,
        "priceRangeMax": 150,
        "createdDate": "2024-03-01T16:19:21.967Z",
        "lastModifiedDate": "2024-03-01T16:19:21.967Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "bfc24ae2-4bda-4fd2-b110-8c120340a70a"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "57ff9192-5fa9-494d-9661-548d28f8af2e",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Condenser Coil",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:35:35.690Z",
        "lastModifiedDate": "2024-03-01T16:35:35.690Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "e3f7c2bc-f7dd-43ff-b471-7729c5080c5a"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "6c2d2a60-9841-4dcf-b2d4-572e36469dfd",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Capacitor 10-035 UF Single",
        "priceRangeMin": 110,
        "priceRangeMax": 125,
        "createdDate": "2024-03-01T16:18:48.070Z",
        "lastModifiedDate": "2024-03-01T16:18:48.070Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "b12f49df-a1ea-41f5-a7f9-cf9b1d1a2c39"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "cc18f586-3b61-437c-a7e1-58d18a8130b6",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Twist Transition/Elbow",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:29:15.020Z",
        "lastModifiedDate": "2024-03-01T16:29:15.020Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "b40702db-8b01-4e97-9b71-5be752984f44",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Refrigerant - R22",
        "priceRangeMin": 60,
        "priceRangeMax": 70,
        "createdDate": "2024-03-01T16:29:57.143Z",
        "lastModifiedDate": "2024-03-01T16:29:57.143Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "63518703-8014-459f-9d1b-db6df18727da",
        perUnitLimit: 22
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "c7da054a-d858-4f24-9632-5c54613b04f2",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Transition",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:29:09.637Z",
        "lastModifiedDate": "2024-03-01T16:29:09.637Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "5dc4a6e6-bb06-4a20-b1d6-5e57aa3af9f5",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Electrical Whip",
        "priceRangeMin": 80,
        "priceRangeMax": 100,
        "createdDate": "2024-03-01T16:23:02.213Z",
        "lastModifiedDate": "2024-03-01T16:23:02.213Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "5827b888-db3f-4369-8127-619e1564bb84",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "T-Stat Replacement - Mechanical",
        "priceRangeMin": 110,
        "priceRangeMax": 125,
        "createdDate": "2024-03-01T16:32:21.350Z",
        "lastModifiedDate": "2024-03-01T16:32:21.350Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "18724e6c-4513-4990-a1bd-44ec0a919de2"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "3dfc3bf3-0b1a-4b3a-b08e-6533ac779a76",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Mastic Seal",
        "priceRangeMin": 100,
        "priceRangeMax": 125,
        "createdDate": "2024-03-01T16:28:49.107Z",
        "lastModifiedDate": "2024-03-01T16:28:49.107Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "555ab7fb-54bd-4570-8d0c-6616fd693f7f",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Filter Drier",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:34:49.400Z",
        "lastModifiedDate": "2024-03-01T16:34:49.400Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "61ffd0b1-22ca-4703-bf28-6aabc39a721a"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "b2490def-14dc-4592-8412-66dbc2f53dd2",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Breaker Disconnect (30-60 amp Non-Fused)",
        "priceRangeMin": 80,
        "priceRangeMax": 95,
        "createdDate": "2024-03-01T16:17:59.017Z",
        "lastModifiedDate": "2024-03-01T16:17:59.017Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "be2505a0-beb6-4503-9f25-f91e53e53a57"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "1cb67625-1257-40fb-94bf-6ad714479b76",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Condenser Replace Labor",
        "priceRangeMin": 280,
        "priceRangeMax": 300,
        "createdDate": "2024-03-01T16:21:31.047Z",
        "lastModifiedDate": "2024-03-01T16:21:31.047Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "92d43db6-4fa0-4201-8ad0-aa494df5b0da"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "f919fb5e-5712-42f5-9415-6c0060817045",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Start Assist Capacitor",
        "priceRangeMin": 145,
        "priceRangeMax": 160,
        "createdDate": "2024-03-01T16:31:27.650Z",
        "lastModifiedDate": "2024-03-01T16:31:27.650Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "d1389d64-4d0c-4047-b696-6719836dc41a"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "a1205576-f811-4f86-8b41-704754d40072",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Condenser Fan Blade (Universal)",
        "priceRangeMin": 80,
        "priceRangeMax": 100,
        "createdDate": "2024-03-01T16:20:35.547Z",
        "lastModifiedDate": "2024-03-01T16:20:35.547Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "757ce7cb-08ce-43f4-9a46-a617f09acb66"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "fc70ed40-3f44-423e-a2ff-7bbddbd18b30",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Line Drier - Liquid Line",
        "priceRangeMin": 80,
        "priceRangeMax": 95,
        "createdDate": "2024-03-01T16:28:20.423Z",
        "lastModifiedDate": "2024-03-01T16:28:20.423Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "8dd164a7-875b-4e1d-9378-ae7857692c42"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "51ad368c-d588-4250-8d3a-852d725a9c0b",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Hanging Kits",
        "priceRangeMin": 175,
        "priceRangeMax": 200,
        "createdDate": "2024-03-01T16:25:23.540Z",
        "lastModifiedDate": "2024-03-01T16:25:23.540Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "c68d0022-fea5-48d1-a7db-a07fe37ad13d",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Condenser Fan Motor (825 RPM)",
        "priceRangeMin": 215,
        "priceRangeMax": 325,
        "createdDate": "2024-03-01T16:21:18.107Z",
        "lastModifiedDate": "2024-03-01T16:21:18.107Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "218c5861-adfb-471e-869f-aa84eea48c1c"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "1969b52a-2f18-44cb-96cd-a0df76e19b1b",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Capacitor 3-7.5 UF Single",
        "priceRangeMin": 100,
        "priceRangeMax": 115,
        "createdDate": "2024-03-01T16:18:27.463Z",
        "lastModifiedDate": "2024-03-01T16:18:27.463Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "58792250-fe53-4c39-9fc3-9821a7d43343"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "c06e60f5-c783-477f-9b30-a17d2f920906",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Leak Repair / Weld",
        "priceRangeMin": 180,
        "priceRangeMax": 200,
        "createdDate": "2024-03-01T16:26:44.910Z",
        "lastModifiedDate": "2024-03-01T16:26:44.910Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "217fc498-e75f-4796-8211-6531432b977e"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "b932b34d-31ac-4922-af11-b76976bb8c8d",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Expansion Valve / Metering Device - TXV",
        "priceRangeMin": 350,
        "priceRangeMax": 370,
        "createdDate": "2024-03-01T16:23:54.403Z",
        "lastModifiedDate": "2024-03-01T16:23:54.403Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "2dd358f4-8d0a-42c4-b73e-411ccc5648ff"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "db20952e-701f-408a-875a-b80e197da0ce",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Leak Search",
        "priceRangeMin": 130,
        "priceRangeMax": 145,
        "createdDate": "2024-03-01T16:27:29.777Z",
        "lastModifiedDate": "2024-03-01T16:27:29.777Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "faf8a3e6-d3ce-43db-a3fa-4c04896559b9"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "c9d18de5-7a44-419b-8447-bb50f47baf11",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Foam Blocks",
        "priceRangeMin": 90,
        "priceRangeMax": 110,
        "createdDate": "2024-03-01T16:25:11.323Z",
        "lastModifiedDate": "2024-03-01T16:25:11.323Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "ed985ab7-0582-4961-aea3-bbdb699f5d1c",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Condenser Side Panel",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:35:28.337Z",
        "lastModifiedDate": "2024-03-01T16:35:28.337Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "0a4dd4be-8ede-4a28-94bf-c7771abb5a2e",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Relay",
        "priceRangeMin": 100,
        "priceRangeMax": 115,
        "createdDate": "2024-03-01T16:29:43.513Z",
        "lastModifiedDate": "2024-03-01T16:29:43.513Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "8c2aec39-d972-4772-bf41-ccc6090dc6f4"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "6c2a19bb-c485-4a74-8107-c7ce8c7bd4b9",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Venturi Ring - 22\"-35\"",
        "priceRangeMin": 125,
        "priceRangeMax": 140,
        "createdDate": "2024-03-01T16:34:01.700Z",
        "lastModifiedDate": "2024-03-01T16:34:01.700Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "c79dc1f3-dd48-402f-8cd9-677ec7c8f815"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "9f1320b1-75b1-497d-a924-c93ede89be90",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Condenser Top Panel",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:35:03.460Z",
        "lastModifiedDate": "2024-03-01T16:35:03.460Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "664ba744-e8df-4312-a983-d150eb43421e",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Flow Check Piston Kit",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:34:58.707Z",
        "lastModifiedDate": "2024-03-01T16:34:58.707Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "cc1d9d69-a9eb-4567-a116-e90d26ba5fba"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "ac6bdfd4-4ab1-4a8a-856e-d15a8cb7a2e6",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Blower Motor 825 RPM",
        "priceRangeMin": 240,
        "priceRangeMax": 260,
        "createdDate": "2024-03-01T16:16:43.960Z",
        "lastModifiedDate": "2024-03-01T16:16:43.960Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "c9a81b03-69d0-4d4d-ad13-2c5ae448b13e"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "3addbd15-ed15-465a-b2fb-d46f2763adbc",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Refrigerant - R410",
        "priceRangeMin": 40,
        "priceRangeMax": 50,
        "createdDate": "2024-03-01T16:30:22.347Z",
        "lastModifiedDate": "2024-03-01T16:30:22.347Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "942b1d5c-f91a-4e50-8f3e-29bae3cc3adb",
        overallLimit: 500
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "88ba9208-c440-48b0-9cd1-d80d22198535",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Expansion Valve / Metering Device - Clear Piston",
        "priceRangeMin": 200,
        "priceRangeMax": 220,
        "createdDate": "2024-03-01T16:23:22.087Z",
        "lastModifiedDate": "2024-03-01T16:23:22.087Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "5a850fd4-2e8c-4b88-8f13-ec379ecce5b9"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "9c15b3c1-bebf-48ec-87ac-d87938fe8ea2",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Condenser Fan Motor (1075 RPM)",
        "priceRangeMin": 185,
        "priceRangeMax": 205,
        "createdDate": "2024-03-01T16:20:57.573Z",
        "lastModifiedDate": "2024-03-01T16:20:57.573Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "8ae320f3-0d8f-4e7a-8a6f-83571feee5b7"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "f7e5277b-f79b-4aa0-ad8a-dc6689084402",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "King Valve - Liquid Side",
        "priceRangeMin": 285,
        "priceRangeMax": 300,
        "createdDate": "2024-03-01T16:26:30.050Z",
        "lastModifiedDate": "2024-03-01T16:26:30.050Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "aa928d44-45ca-4118-bc60-fb476035d2ae"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "dc83189b-3f8f-4b9e-bdb4-dcc7e062811b",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Compressor Grommet",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:34:44.567Z",
        "lastModifiedDate": "2024-03-01T16:34:44.567Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "a8de8115-3b3e-4a3a-83ad-dfb159f1c455",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "T-Stat Wiring",
        "priceRangeMin": 100,
        "priceRangeMax": 120,
        "createdDate": "2024-03-01T16:31:56.490Z",
        "lastModifiedDate": "2024-03-01T16:31:56.490Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "f6d46dc6-98a7-4714-b85a-795219edfbf4"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "cd1b45ca-efc6-400d-8554-e12b2ffce844",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Capacitor Strap",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:34:24.330Z",
        "lastModifiedDate": "2024-03-01T16:34:24.330Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "536a0642-f5ab-42fd-a541-e1ca2556e19c",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Compressor Scroll Harness",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:34:53.967Z",
        "lastModifiedDate": "2024-03-01T16:34:53.967Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "dc98a6c2-2871-4856-9277-d9366738b624"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "7afe8ae5-2827-4c5f-b95e-e2231ed7e5cf",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Compressor Labor",
        "priceRangeMin": 380,
        "priceRangeMax": 420,
        "createdDate": "2024-03-01T16:20:11.847Z",
        "lastModifiedDate": "2024-03-08T22:19:51.600Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": true,
        "salesItemCoverageAuthorizationRepairItemId": "101e7065-7bfc-46fb-9610-5c353ac22593"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "1da2912f-3037-4ee7-a9e0-e5a8c932e9b6",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "T-Stat Replacement - Digital",
        "priceRangeMin": 125,
        "priceRangeMax": 150,
        "createdDate": "2024-03-01T16:32:37.067Z",
        "lastModifiedDate": "2024-03-01T16:32:37.067Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "d222919b-1dd3-4785-92de-36f0257861fa"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "f8425fed-a8d1-4555-af50-e8106983b164",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Access Panels",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:34:17.377Z",
        "lastModifiedDate": "2024-03-01T16:34:17.377Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "960d82a0-7a54-4899-86fc-ee414ff1b164",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Refrigerant - R407",
        "priceRangeMin": 40,
        "priceRangeMax": 50,
        "createdDate": "2024-03-01T16:30:10.917Z",
        "lastModifiedDate": "2024-03-01T16:30:10.917Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "e053a318-7df4-4414-afef-6affbed8f58f"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "b627177f-0a9d-4e7d-85c7-f17ea9c246ce",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Transformer - 50-75 Volt",
        "priceRangeMin": 135,
        "priceRangeMax": 150,
        "createdDate": "2024-03-01T16:33:28.373Z",
        "lastModifiedDate": "2024-03-01T16:33:28.373Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "264bf9cb-5960-4914-9883-f6f8ed142c74"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "45c4fbaf-07ab-4340-a81e-f25d3a1622c9",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Muffler",
        "priceRangeMin": null,
        "priceRangeMax": null,
        "createdDate": "2024-03-01T16:34:10.017Z",
        "lastModifiedDate": "2024-03-01T16:34:10.017Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": null
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "7501097b-d7e3-4361-9a69-f4abf55b4a10",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Hard Start 1-3 Ton",
        "priceRangeMin": 160,
        "priceRangeMax": 180,
        "createdDate": "2024-03-01T16:25:44.290Z",
        "lastModifiedDate": "2024-03-01T16:25:44.290Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "d0d1a874-7451-41c5-a755-69b16e0ee27f"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "6b1246ed-4faa-4b70-ba06-f917050a81d7",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Hard Start 3-5 Ton",
        "priceRangeMin": 170,
        "priceRangeMax": 190,
        "createdDate": "2024-03-01T16:25:57.223Z",
        "lastModifiedDate": "2024-03-01T16:25:57.223Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "00276509-7153-4206-98a0-5f72048527a7"
      },
      {
        "workOrderLineId": "f0d92222-31be-4925-8763-e645d207d106",
        "id": "036a4ac0-6b60-4fe3-9214-ff7857b4e453",
        "workOrderItemId": "ca7b6e7a-8810-4fbd-8b81-7e6d14b8e9d1",
        "name": "Fuse (Time Delay)",
        "priceRangeMin": 10,
        "priceRangeMax": 12,
        "createdDate": "2024-03-01T16:24:23.110Z",
        "lastModifiedDate": "2024-03-01T16:24:23.110Z",
        "createdById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "lastModifiedById": "8e5c8b2f-845e-456f-a3d9-1ba9e4e75635",
        "deletedDate": null,
        "companyNeverProvides": null,
        "salesItemCoverageAuthorizationRepairItemId": "8e1a773f-c00a-46dc-9b4c-c0cf832811c3"
      }
    ];
  }
}

export class CostLine {
  description: string;
  amount: number;
  repairItemId: string;
  id: string;
  authorizationRepairItemSelector?: WorkOrderLineAuthorizationRepairItem;
  qty: number;
  companyProvidedAvailable = true;
  companyProvidesPart = false;
  defaultItem = false;
  partNumber: string;
  disputeCoverage = false;
  disputeReason: string;
  forIncompatibility = false;

  constructor() {
    this.amount = 0;
    this.qty = 1;
  }

  get isQuestion() {
    return !this.authorizationRepairItemSelector;
  }

  get ext() {
    return this.qty * this.amount;
  }

  get isCovered() {
    return this.authorizationRepairItemSelector?.salesItemCoverageAuthorizationRepairItemId;
  }

  get notCovered() {
    return this.authorizationRepairItemSelector && !this.authorizationRepairItemSelector.salesItemCoverageAuthorizationRepairItemId;
  }

  get isRed() {
    if (!this.authorizationRepairItemSelector?.priceRangeMin) {
      return false;
    }

    return this.pct > 70;
  }

  get isGreen() {
    if (!this.authorizationRepairItemSelector?.priceRangeMin) {
      return false;
    }
    if (this.pct < 40) {
      return true;
    }

    return false;
  }

  get isYellow() {
    if (!this.authorizationRepairItemSelector?.priceRangeMin) {
      return false;
    }

    if (this.pct >= 40 && this.pct < 70) {
      return true;
    }

    return false;
  }

  get pct() {
    if (!this.authorizationRepairItemSelector?.priceRangeMin || !this.authorizationRepairItemSelector?.priceRangeMax) {
      return 0;
    }

    let maxValue = this.authorizationRepairItemSelector.priceRangeMax * 1.1;
    let minValue = this.authorizationRepairItemSelector.priceRangeMin * .95;
    let value = this.amount;
    if (value > maxValue) {
      value = maxValue;
    }
    if (value < minValue) {
      value = minValue;
    }

    let range = maxValue - minValue;
    value = value - minValue;

    if (range === 0) {
      return 0;
    }

    return (value / range) * 100;
  }

  get indicatorPercent() {
    return this.pct.toString() + '%';
  }

}