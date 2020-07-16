import EditableText from "../src/EditableText";

export default function Home() {
  return (
    <div className="container">
      <EditableText fileUrl="pages/index.js" id="title-1">
        <h1>Hi there 👋 We can edit our content now 🎉</h1>
      </EditableText>
    </div>
  );
}
