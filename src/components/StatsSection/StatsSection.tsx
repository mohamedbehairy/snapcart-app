"use client";
import CountUp from "react-countup";

export default function StatsSection() {
  {
    /* Stats Section */
  }
  return (
    <section className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-primary">
              <CountUp end={1000} enableScrollSpy scrollSpyOnce />+
            </div>
            <div className="text-md text-muted-foreground font-mono font-semibold mt-2">
              Products Available
            </div>
          </div>

          <div className="text-center p-4">
            <div className="text-3xl font-bold text-primary">
              <CountUp end={500} enableScrollSpy scrollSpyOnce />+
            </div>
            <div className="text-md text-muted-foreground font-mono font-semibold mt-2">
              Premium Products
            </div>
          </div>

          <div className="text-center p-4">
            <div className="text-3xl font-bold text-primary">
              <CountUp end={10000} enableScrollSpy scrollSpyOnce />+
            </div>
            <div className="text-md text-muted-foreground font-mono font-semibold mt-2">
              Happy Customers
            </div>
          </div>

          <div className="text-center p-4">
            <div className="text-3xl font-bold text-primary">
              <CountUp end={50000} enableScrollSpy scrollSpyOnce />+
            </div>
            <div className="text-md text-muted-foreground font-mono font-semibold mt-2">
              Orders Delivered
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
