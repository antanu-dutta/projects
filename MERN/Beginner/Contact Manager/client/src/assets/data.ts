type Contact = {
  _id: string;
  name: string;
  contactNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export const contactData: Contact[] = [
  {
    _id: "672e8f42f2a4d932cc0001a1",
    name: "Antanu Dutta",
    contactNumber: "+91 9876543210",
    email: "antanu.dutta@example.com",
    createdAt: "2025-11-01T09:12:45.123Z",
    updatedAt: "2025-11-08T14:22:10.563Z",
  },
  {
    _id: "672e8f42f2a4d932cc0001a2",
    name: "Priya Sharma",
    contactNumber: "+91 9123456780",
    email: "priya.sharma@example.com",
    createdAt: "2025-10-27T10:45:30.654Z",
    updatedAt: "2025-11-02T18:21:10.321Z",
  },
  {
    _id: "672e8f42f2a4d932cc0001a3",
    name: "Rohit Mehta",
    contactNumber: "+91 9801122334",
    email: "rohit.mehta@example.com",
    createdAt: "2025-10-25T12:12:12.789Z",
    updatedAt: "2025-11-04T11:45:50.654Z",
  },
  {
    _id: "672e8f42f2a4d932cc0001a4",
    name: "Sneha Iyer",
    contactNumber: "+91 7012345678",
    email: "sneha.iyer@example.com",
    createdAt: "2025-10-20T07:45:20.321Z",
    updatedAt: "2025-11-05T15:30:45.210Z",
  },
  {
    _id: "672e8f42f2a4d932cc0001a5",
    name: "Arjun Patel",
    contactNumber: "+91 8877665544",
    email: "arjun.patel@example.com",
    createdAt: "2025-09-30T06:22:50.111Z",
    updatedAt: "2025-10-15T19:40:30.421Z",
  },
];
