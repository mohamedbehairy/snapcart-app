import { authOptions } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronRight,
  Heart,
  KeyRound,
  LogIn,
  Mail,
  MapPin,
  Package,
  Shield,
  ShoppingBag,
  User,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
 
  return (
    <>
      {session ? (
        <div className="min-h-screen bg-background">
          <div className="container py-4 sm:py-6 px-4 max-w-6xl">
            {/* Header */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 sm:mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-1">
                    My Profile
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Manage your account and preferences
                  </p>
                </div>
                <Badge variant="secondary" className="px-3 py-1.5 w-fit">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                  <span className="text-xs sm:text-sm">Verified</span>
                </Badge>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <Card className="border border-accent shadow-lg">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar */}
                      <div className="relative mb-3">
                        <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-lg">
                          {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 sm:border-3 border-background"></div>
                      </div>

                      {/* Info */}
                      <h2 className="text-lg sm:text-xl font-bold mb-0.5">
                        {session?.user?.name || "User Name"}
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 break-all">
                        {session?.user?.email || "email@example.com"}
                      </p>

                      <Badge className="mb-3 text-xs">Premium Member</Badge>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg bg-secondary/30">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Mail className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-xs sm:text-sm font-medium truncate">
                            {session?.user?.email || "email@example.com"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Settings & Actions */}
              <div className="lg:col-span-2 space-y-4">
                {/* Account Settings */}
                <Card className="border border-accent shadow-lg">
                  <CardHeader className="p-4 pb-3">
                    <CardTitle className="text-lg sm:text-xl">
                      Account Settings
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Manage your security and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-1.5">
                    {/* Edit Profile */}
                    <Link href="/profile/edit">
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-primary/5 transition-all group cursor-pointer">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm">
                              Edit Profile
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              Update personal information
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                      </div>
                    </Link>

                    {/* Change Password */}
                    <Link href="/profile/change-password">
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-destructive/5 transition-all group cursor-pointer">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                            <KeyRound className="h-5 w-5 text-destructive" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm">
                              Change Password
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              Update your security
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-destructive group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                      </div>
                    </Link>

                    {/* My Addresses */}
                    <Link href="/profile/addresses">
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-500/5 transition-all group cursor-pointer">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                            <MapPin className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm">
                              My Addresses
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              Manage shipping addresses
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                      </div>
                    </Link>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border border-accent shadow-lg">
                  <CardHeader className="p-4 pb-3">
                    <CardTitle className="text-lg sm:text-xl">
                      Quick Actions
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Access your favorite features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {/* My Orders */}
                      <Link href="/allorders">
                        <Card className="border border-accent hover:border-accent-foreground duration-500 hover:shadow-md transition-all cursor-pointer group h-full">
                          <CardContent className="p-3">
                            <div className="flex items-start gap-2">
                              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Package className="h-5 w-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm mb-0.5">
                                  My Orders
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Track orders
                                </p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0 hidden sm:block" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      {/* Wishlist */}
                      <Link href="/wishlist">
                        <Card className="border border-accent hover:border-accent-foreground duration-500 hover:shadow-md transition-all cursor-pointer group h-full">
                          <CardContent className="p-3">
                            <div className="flex items-start gap-2">
                              <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Heart className="h-5 w-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm mb-0.5">
                                  Wishlist
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Saved items
                                </p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0 hidden sm:block" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      {/* Cart */}
                      <Link href="/cart">
                        <Card className="border border-accent hover:border-accent-foreground duration-500 hover:shadow-md transition-all cursor-pointer group h-full">
                          <CardContent className="p-3">
                            <div className="flex items-start gap-2">
                              <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <ShoppingBag className="h-5 w-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm mb-0.5">
                                  Cart
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  View cart
                                </p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0 hidden sm:block" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <Card className="border border-accent w-full max-w-md shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <LogIn className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Login Required</h2>
              <p className="text-muted-foreground mb-6">
                You need to be logged in to access your profile.
              </p>
              <Button asChild className="w-full">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Go to Login
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
