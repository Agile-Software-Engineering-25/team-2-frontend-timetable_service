import { Box, Typography } from "@mui/joy";
import LanguageSelectorComponent from "@components/LanguageSelectorComponent/LanguageSelectorComponent";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button } from "@agile-software/shared-components";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 2, maxWidth: 700, mx: "auto" }}>
      <Typography>{t("pages.home.title")}</Typography>
      <Button color="neutral" onClick={() => navigate("/weather")}>
        {t("pages.home.weatherButton")}
      </Button>
      <LanguageSelectorComponent />
    </Box>
  );
};

export default Home;
