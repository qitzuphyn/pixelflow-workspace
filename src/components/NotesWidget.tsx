import { useState } from "react";

const NotesWidget = () => {
  const [notes, setNotes] = useState(
    "Do not forget to grab the package from the next home backyard"
  );

  return (
    <div className="widget p-3 w-64 h-44">
      <h3 className="font-semibold text-foreground mb-2 text-sm">Notes</h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
        className="w-full h-28 bg-transparent resize-none text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
};

export default NotesWidget;
