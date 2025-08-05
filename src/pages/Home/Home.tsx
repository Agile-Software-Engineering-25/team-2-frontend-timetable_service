import { Box, Button, Typography } from "@mui/material";
import LanguageSelectorComponent from "@components/LanguageSelectorComponent/LanguageSelectorComponent";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 2, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {t("pages.home.title")}
      </Typography>
      <Typography align="center" variant="body1" marginBottom={2}>
        <Button onClick={() => navigate("/weather")}>
          {t("pages.home.weatherButton")}{" "}
        </Button>
      </Typography>
      <LanguageSelectorComponent />
    </Box>
  );
};

export default Home;
