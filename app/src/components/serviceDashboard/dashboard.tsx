import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export default function ServicesDashboard() {
  const services = [
    { title: "Doctor", desc: "Book a medical visit", icon: "👨‍⚕️" },
    { title: "Plumber", desc: "Fix home issues", icon: "🔧" },
    { title: "Car Service", desc: "Repair & maintenance", icon: "🚗" },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Welcome 👋
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: "gray" }}>
        How can we help you today
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 3,
        }}
      >
        {services.map((s) => (
          <Card
            key={s.title}
            sx={{
              p: 3,
              textAlign: "center",
              cursor: "pointer",
              borderRadius: 3,
              transition: "0.2s",
              "&:hover": { boxShadow: 6 },
            }}
          >
            <Typography sx={{ fontSize: 40 }}>{s.icon}</Typography>

            <Typography variant="h6" sx={{ mt: 1 }}>
              {s.title}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
              {s.desc}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
