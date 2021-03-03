import EditableText from "../src/EditableText";

export default function Home() {
  return (
    <div className="container">
      <EditableText fileUrl="pages/index.js" id="title-1"><h1>
  <span style={{
      fontSize: 'xx-large'
    }}
  >
    Hi, I am Razvan 
  </span>
  👋
</h1></EditableText>
    </div>
  );
}
