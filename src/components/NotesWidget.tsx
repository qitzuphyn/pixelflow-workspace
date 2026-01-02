import { useState } from "react";

const NotesWidget = () => {
  const [notes, setNotes] = useState(
    "Do not forget to grab the package from the next home backyard"
  );

  return (
    <div className="widget p-4 w-64 h-56">
      <h3 className="font-semibold text-foreground mb-3">Notes</h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
        className="w-full h-36 bg-transparent resize-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
};

export default NotesWidget;
