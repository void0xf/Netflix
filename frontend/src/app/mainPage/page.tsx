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
import { trendingContent } from "../browse/page";
import ArrowBack from "@mui/icons-material/ArrowBackIosNew";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { accordionContent, features, footerLinks } from "./text";

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
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              className="default-ltr-cache-4wvxq9-StyledBrandLogo ev1dnif2"
              fill="red"
              height="40"
            >
              <g>
                <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
              </g>
            </svg>
          </Box>
          <Button
            variant="contained"
            sx={{ background: "red", width: "140px" }}
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
              {trendingContent.map((video, index) => (
                <Box
                  key={index}
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
                      src={video.thumbnail}
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
