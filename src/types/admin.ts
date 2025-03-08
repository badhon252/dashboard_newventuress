export type License = {
  name: string;
  businessLicense: { license: string; isVerified: boolean }[];
  cannabisLicense: { license: string; isVerified: boolean }[];
  metrcLicense: { license: string; isVerified: boolean }[];
  accept: string[];
  _id: string;
};

export type BusinessInfo = {
  country: string;
  state: string[];
  license: License[];
  _id: string;
};

export type User = {
  _id: string;
  email: string;
  fullName: string;
  industry: string[];
  profession: string[];
  role: "vendor" | "admin" | "customer"; // Adjust based on possible roles
  businessInfo: BusinessInfo[];
  businessName: string;
  verifyEmail: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type VendorManagementResponse = {
  status: boolean;
  message: string;
  data?: User[];
};
