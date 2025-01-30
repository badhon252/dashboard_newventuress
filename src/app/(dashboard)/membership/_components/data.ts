export type Membership = {
  id: number;
  name: string;
  profileImage: string;
  email: string;
  plan: string;
  time: string;
  auctionRemaining: number;
  bidsRemaining: number;
  store: number;
};

export const membershipList = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    profileImage:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    plan: "Gold",
    time: "subscription",
    auctionRemaining: 5,
    bidsRemaining: 10,
    store: 3,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    profileImage:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    plan: "Silver",
    time: "one time",
    auctionRemaining: 2,
    bidsRemaining: 5,
    store: 1,
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    profileImage:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    plan: "Bronze",
    time: "subscription",
    auctionRemaining: 10,
    bidsRemaining: 20,
    store: 5,
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    profileImage:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    plan: "Gold",
    time: "one time",
    auctionRemaining: 1,
    bidsRemaining: 3,
    store: 2,
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    profileImage:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    plan: "Silver",
    time: "subscription",
    auctionRemaining: 7,
    bidsRemaining: 15,
    store: 4,
  },
  {
    id: 6,
    name: "Eve White",
    email: "eve.white@example.com",
    profileImage:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    plan: "Bronze",
    time: "one time",
    auctionRemaining: 3,
    bidsRemaining: 7,
    store: 1,
  },
] as Membership[];
