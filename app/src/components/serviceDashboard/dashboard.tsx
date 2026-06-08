import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export default function ServicesDashboard() {
  const services = [
    { title: "Doctor Visit", icon: "👨‍⚕️" },
    { title: "Cooks", icon: "🍲" },
    { title: "Women's Salon", icon: "💇‍♀️" },
    { title: "Women's Massage", icon: "🧘‍♀️" },
    { title: "Men's Salon & Massage", icon: "💆‍♂️" },
    { title: "Ironing at-home", icon: "👕" },
    { title: "Home Repairs & AC", icon: "🔧" },
    { title: "Car Service", icon: "🚗" },
    { title: "Deep Cleaning & Pest control", icon: "🧹" },
  ];

  return (
    <div>
      {/* Header */}
      <header className="bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-black font-bold text-xl">MK TotalCare</div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 4,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {services.map((s) => (
          <Card
            key={s.title}
            sx={{
              p: 4,
              textAlign: "center",
              cursor: "pointer",
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
              border: "none",
              boxShadow: "none",
              transition: "all 0.3s ease",
              "&:hover": { 
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <Typography sx={{ fontSize: 60, mb: 2 }}>{s.icon}</Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 600,
                color: "#000",
                lineHeight: 1.4,
              }}
            >
              {s.title}
            </Typography>
          </Card>
        ))}
      </Box>
      </section>

    </div>
  );
}
