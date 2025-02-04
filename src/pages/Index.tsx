import AlarmsTable from "@/components/AlarmsTable";

const Index = () => {
  return (
    <div className="min-h-screen p-8 bg-alarm-background">
      <h1 className="text-2xl font-semibold mb-6 text-foreground">Alarm Management</h1>
      <AlarmsTable />
    </div>
  );
};

export default Index;