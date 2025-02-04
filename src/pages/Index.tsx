import AlarmsTable from "@/components/AlarmsTable";

const Index = () => {
  return (
    <div className="min-h-screen p-8 bg-alarm-background">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-foreground">
            Alarm Management
          </h1>
          <div className="px-4 py-2 rounded-lg glass-card inline-flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-alarm-muted">System Active</span>
          </div>
        </div>
        <AlarmsTable />
      </div>
    </div>
  );
};

export default Index;