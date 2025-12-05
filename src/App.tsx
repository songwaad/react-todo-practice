import AdminLayout from "./layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Folder, Plus, Flag, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "./components/ui/card";

function App() {
  return (
    <>
      <AdminLayout>
        <div className="flex justify-between">
          <div>All Tasks</div>
          <Button size="sm"><Plus size={20} strokeWidth={2} />Add Task</Button>
        </div>
        <div>
          <Card className="mt-4 py-4">
            <CardContent className="px-6">
              <p className="text-md">House Cleaning</p>
              <p className="text-sm text-gray-600">Sweep the house, mop the floor, clean the windows</p>
              <div className="flex gap-1 pt-2">
                <Badge><Flag />Medium</Badge>
                <Badge><Folder />Housework</Badge>
                <Badge><Calendar />5 Dec 2024</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </>
  );
}

export default App;
