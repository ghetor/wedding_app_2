export default function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <h1
        className="page-title"
        style={{
          fontSize: "1.75rem",
          letterSpacing: "0.3px",
          marginTop: "45px",
          marginBottom: "10px",
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          className="page-subtitle"
          style={{ marginBottom: "20px", opacity: 0.85 }}
        >
          {subtitle}
        </p>
      )}
    </>
  );
}
