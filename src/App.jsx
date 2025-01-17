import   { useState } from "react";
import GreetingForm from "./components/Greeting_Forms/GreetingForm";
import GreetingList from "./components/Greetings_List/GreetingList";

const App = () => {
  const [editingGreeting, setEditingGreeting] = useState(null);

  const handleCreateOrUpdate = async (data) => {
    if (editingGreeting) {
      // Update the greeting
      await fetch(`https://greetings-server-dg7y.onrender.com/greetings/${editingGreeting.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      // Create a new greeting
      await fetch("https://greetings-server-dg7y.onrender.com/greetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setEditingGreeting(null); // Reset the form
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center">Greeting Cards</h1>
      <GreetingForm
        onSubmit={handleCreateOrUpdate}
        initialData={editingGreeting}
      />
      <GreetingList onEdit={setEditingGreeting} />
    </div>
  );
};

export default App;
