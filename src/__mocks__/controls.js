export const controls = [
  {
    key: "ID.AM-1",
    category: "ID.AM-1:  Physical devices and systems within the organization are inventoried",
    controlRequirement: [
      "0701.07a1Organizational.12\nAn inventory of assets and services is maintained.",
      "0702.07a1Organizational.3\nThe information lifecycle manages the secure use, transfer, exchange, and disposal of IT-related assets.",
      "0720.07a1Organizational.4\nThe organization's asset inventory does not duplicate other inventories unnecessarily and ensures their respective content is aligned.",
      "0721.07a1Organizational.5\nThe organization maintains an inventory of authorized wireless access points (WAPs), including a documented business justification, to support unauthorized WAP identification and response.",
      "0722.07a1Organizational.67\nIf the organization assigns assets to contractors, it ensures that the procedures for assigning and monitoring the use of the property are included in the contract; and, if assigned to volunteer workers, there is a written agreement specifying how and when the property will be inventoried and how it will be returned upon completion of the volunteer assignment."
    ] 
  },
  {
    key: "ID.AM-2",
    category: "ID.AM-2:  Software platforms and applications within the organization are inventoried",
    controlRequirement: [
      "0701.07a1Organizational.12\nAn inventory of assets and services is maintained.",
      "0702.07a1Organizational.3\nThe information lifecycle manages the secure use, transfer, exchange, and disposal of IT-related assets.",  
      "0722.07a1Organizational.67\nIf the organization assigns assets to contractors, it ensures that the procedures for assigning and monitoring the use of the property are included in the contract; and, if assigned to volunteer workers, there is a written agreement specifying how and when the property will be inventoried and how it will be returned upon completion of the volunteer assignment."
    ]
  },
  {
    key: "ID.AM-3",
    category: "ID.AM-3:  Organizational communication and data flows are mapped",
    controlRequirement: [
      "0806.01m2Organizational.12356\nThe organization’s network is logically and physically segmented with a defined security perimeter and a graduated set of controls, including subnetworks for publicly accessible system components that are logically separated from the internal network, based on organizational requirements; traffic is controlled based on functionality required and classification of the data/systems based on a risk assessment and their respective security requirements.",
      "0815.01o2Organizational.123\nRequirements for network routing control are based on the access control policy, including positive source and destination checking mechanisms, such as firewall validation of source/destination addresses, and the hiding of internal directory services and IP addresses. The organization designed and implemented network perimeters so that all outgoing network traffic to the Internet passes through at least one application layer filtering proxy server. The proxy supports decrypting network traffic, logging individual TCP sessions, blocking specific URLs, domain names, and IP addresses to implement a blacklist, and applying whitelists of allowed sites that can be accessed through the proxy while blocking all other sites. The organization forces outbound traffic to the Internet through an authenticated proxy server on the enterprise perimeter.",
      "0819.09m1Organizational.23\nA current network diagram (including wireless networks) exists, and is updated whenever there are network changes and no less than every six months.",
      "0886.09n2Organizational.4\nThe organization employs and documents in a formal agreement or other document—either i) allow-all, deny-by-exception, or ii) deny-all, permit-by-exception (preferred)—policy for allowing specific information systems to connect to external information systems.",
      "0887.09n2Organizational.5\nThe organization requires external/outsourced service providers to identify the specific functions, ports, and protocols used in the provision of the external/outsourced services.",
      "1401.05i1Organizational.1239\nAccess to the organization’s information and systems by external parties is not permitted until due diligence has been conducted, the appropriate controls have been implemented, and a contract/agreement reflecting the security requirements is signed acknowledging they understand and accept their obligations.",
      "1402.05i1Organizational.45\nRemote access connections between the organization and external parties are encrypted.",
      "1418.05i1Organizational.8\nThe identification of risks related to external party access takes into account a minimal set of specifically defined issues."
    ]
  },
  {
    key: "ID.AM-4",
    category: "ID.AM-4:  External information systems are catalogued",
    controlRequirement: [
      "0835.09n1Organizational.1\nAgreed services provided by a network service provider/manager are formally managed and monitored to ensure they are provided securely.",
      "0836.09n2Organizational.1\nThe organization formally authorizes and documents the characteristics of each connection from an information system to other information systems outside the organization.",
      "0837.09n2Organizational.2\nFormal agreements with external information system providers include specific obligations for security and privacy.",
      "1409.09e2System.1\nThe organization develops, disseminates and annually reviews/updates a list of current service providers, which includes a description of services provided."
    ]
  },
  {
    key: "ID.AM-5",
    category: "ID.AM-5:  Resources (e.g., hardware, devices, data, and software) are prioritized based on their classification, criticality, and business value",
    controlRequirement: [
      "0701.07a1Organizational.12\nAn inventory of assets and services is maintained.",
      "0703.07a2Organizational.1\nThe inventory of all authorized assets includes the owner of the information asset, custodianship, categorizes the information asset according to criticality and information classification, and identifies protection and sustainment requirements commensurate with the asset's categorization.",
      "0816.01w1System.1\nThe sensitivity of applications/systems is explicitly identified and documented by the application/system owner.",
      "1601.12c1Organizational.1238\nThe organization can recover and restore business operations and establish an availability of information in the time frame required by the business objectives and without a deterioration of the security measures.",
      "1602.12c1Organizational.4567\nThe contingency program addresses required capacity, identifies critical missions and business functions, defines recovery objectives and priorities, and identifies roles and responsibilities.",
      "1604.12c2Organizational.16789\nAlternative storage and processing sites are identified (permanent and/or temporary) at a sufficient distance from the primary facility and configured with security measures equivalent to the primary site, and the necessary third-party service agreements have been established to allow for the resumption of information systems operations of critical business functions within the time period defined (e.g., priority of service provisions) based on a risk assessment, including Recovery Time Objectives (RTO), in accordance with the organization's availability requirements.",
      "1669.12d1Organizational.8\nThe business continuity planning framework addresses a specific, minimal set of information security requirements.",
      "19142.06c1Organizational.8\nGuidelines are issued by the organization on the ownership, classification, retention, storage, handling and disposal of all records and information.",
      "19143.06c1Organizational.9\nDesignated senior management within the organization reviews and approves the security categorizations and associated guidelines."
    ]
  }
];