import { authOptions } from "@/auth";
import Addresses from "@/components/Addresses/Addresses";
import { Button } from "@/components/ui/button";
import { AddressesResponse } from "@/interfaces/ProfileInterfaces";
import { AlertTriangle } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AddressesPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.token) {
    redirect("/login");
  }

  let addressesData: AddressesResponse | null = null;

  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/addresses`, {
      headers: {
        token: session.token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (response.ok) {
      addressesData = await response.json();
     }
  } catch (error) {
    console.error("Error fetching addresses:", error);
  }

  return addressesData ? (
    <Addresses data={addressesData} />
  ) : (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <AlertTriangle className="h-12 w-12 text-destructive mb-6" />
        <h2 className="text-xl font-semibold mb-2">Failed to load addresses</h2>
        <Button asChild>
          <a href="/profile/addresses">Try Again</a>
        </Button>
      </div>
    </div>
  );
}
