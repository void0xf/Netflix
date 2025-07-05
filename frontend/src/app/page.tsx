"use client";

import React, { useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  IconButton,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Link,
} from "@mui/material";
import { sampleVideos } from "@/components/ui/preview-carousel/carousel";
import ArrowBack from "@mui/icons-material/ArrowBackIosNew";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { accordionContent, features, footerLinks } from "./text";
import { filmsData } from "./data/films";

const MainPage = () => {
  const carouselRef = useRef(null);
  const router = useRouter();
  if (!Array.isArray(sampleVideos)) {
    console.error("sampleVideos is not an array:", sampleVideos);
    return <div>Error loading videos</div>;
  }
  const scroll = (scrollOffset: number) => {
    if (carouselRef.current) {
      (carouselRef.current as HTMLDivElement).scrollLeft += scrollOffset;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        color: "white",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://assets.nflxext.com/ffe/siteui/vlv3/cb17c41d-6a67-4472-8b91-cca977e65276/web/PL-pl-20250505-TRIFECTA-perspective_d68f49b7-276b-44b1-9d22-5db71cf9d528_large.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        paddingTop: "20px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box display="flex" justifyContent="center">
              <img
                src="/logo-no-background.png"
                alt="Logo"
                style={{ height: 80 }}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{ background: "red", width: "140px", height: "40px" }}
            onClick={() => {
              router.push("/auth/authPage");
            }}
          >
            Zaloguj sie
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            my: 10,
            maxWidth: "600px",
            paddingTop: "150px",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Filmy, seriale i wiele więcej bez ograniczeń
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Oglądaj gdzie chcesz. Anuluj kiedy chcesz.
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, fontSize: "1.2rem" }}>
            Gotowy, aby obejrzeć? Wprowadź swój email, aby utworzyć lub odnowić
            członkostwo.
          </Typography>

          <Box
            component="form"
            sx={{ display: "flex", gap: 2, mb: 15, width: "100%" }}
          >
            <TextField
              placeholder="Adres email"
              variant="outlined"
              fullWidth
              sx={{
                backgroundColor: "rgba(255,255,255,0.8)",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="error"
              size="large"
              sx={{
                px: 4,
                fontWeight: "bold",
                fontSize: "1.1rem",
                whiteSpace: "nowrap",
              }}
            >
              Rozpocznij ›
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            zIndex: 1,
            p: 3,
            borderRadius: 1,
            my: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h3"
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Popularne teraz
          </Typography>

          <IconButton
            onClick={() => scroll(-300)}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
          >
            <ArrowBack />
          </IconButton>
          <Box sx={{ position: "relative" }}>
            <Box sx={{ position: "relative" }}>
              <Box
                ref={carouselRef}
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  gap: 2,
                  px: 5,
                  scrollBehavior: "smooth",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {filmsData.map((video: Video) => (
                  <Box
                    sx={{
                      flex: "0 0 auto",
                      scrollSnapAlign: "start",
                      width: "12rem",
                    }}
                  >
                    <Card
                      sx={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={video.image_url}
                        alt={video.title}
                        style={{
                          width: "100%",
                          borderRadius: "4px",
                        }}
                      />
                      <CardContent sx={{ padding: 1 }}>
                        <Typography
                          variant="body1"
                          color="white"
                          align="center"
                          noWrap
                        >
                          {video.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <IconButton
            onClick={() => scroll(300)}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>

        <Typography
          variant="h4"
          component="h2"
          align="left"
          gutterBottom
          sx={{
            fontWeight: "bold",
          }}
        >
          Więcej powodów, aby dołączyć
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                maxWidth: 250,
                p: 2,
                backgroundColor: "#100100100",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {feature.title}
                </Typography>
                <Typography variant="h5" component="div"></Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Box sx={{ width: "100%", my: 10 }}>
          {accordionContent.map((item, index) => (
            <Accordion
              key={index}
              sx={{
                backgroundColor: "#909090",
                marginBottom: 2,
                width: "100%",
                borderRadius: "4px",
              }}
            >
              <AccordionSummary expandIcon={<PlusIcon />}>
                <Typography variant="h6">{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>{item.description}</AccordionDetails>
            </Accordion>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            my: 1,
            gap: 2,
          }}
        >
          <Typography variant="h6">
            Zaczynamy oglądać? Wprowadź adres e‑mail, aby utworzyć lub odnowić
            konto.
          </Typography>
          <Box
            component="form"
            sx={{ display: "flex", gap: 2, width: "100%", mb: 2 }}
          >
            <TextField
              placeholder="Adres email"
              variant="outlined"
              fullWidth
              sx={{
                backgroundColor: "rgba(255,255,255,0.8)",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="error"
              size="large"
              sx={{
                px: 4,
                fontWeight: "bold",
                fontSize: "1.1rem",
                whiteSpace: "nowrap",
              }}
            >
              Rozpocznij ›
            </Button>
          </Box>
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
          }}
        >
          Pytania? Zadzwoń pod numer 00.800.112.4392
        </Typography>

        <Grid container spacing={4}>
          {footerLinks.map((column, index) => (
            <Box key={index}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                {column.title}
              </Typography>
              <Box
                component="ul"
                sx={{ listStyle: "none", padding: 0, margin: 0 }}
              >
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href="#"
                      underline="hover"
                      sx={{
                        color: "inherit",
                        display: "block",
                        mb: 1,
                      }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </Box>
            </Box>
          ))}
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: "divider" }} />

        <Box sx={{ mt: 4, pb: 5 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>4k. Polski</strong>
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Netflix Polska</strong>
          </Typography>
          <Typography variant="caption">
            Ta strona korzysta z zabezpieczenia Google reCAPTCHA, by upewnić
            się, że nie jesteś botem. Dowiedz się więcej.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;

interface Video {
  title: string;
  image_url: string;
  year?: number;
  tmdb_id?: number;
}
