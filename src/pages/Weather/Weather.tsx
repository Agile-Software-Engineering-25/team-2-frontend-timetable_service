import { Units } from "@custom-types/weather";
import { useTypedSelector } from "@stores/rootReducer";
import { setTemperature } from "@stores/slices/weatherSlice";
import useApi from "@hooks/useApi";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const Weather = () => {
  const { t } = useTranslation();
  const { getCurrentWeather } = useApi();
  const weather = useTypedSelector((state) => state.weather.data);
  const dispatch = useDispatch();

  return (
    <Box sx={{ padding: 2, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {t("pages.weather.title")}
      </Typography>
      <Typography variant="body1" align="center">
        {t("pages.weather.description")}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            const currentWeather = await getCurrentWeather(
              52.49641563400074,
              13.35777816890088,
              Units.DWD
            );
            dispatch(setTemperature(currentWeather.weather.temperature));
          }}
        >
          {t("pages.weather.getWeatherButton")}
        </Button>
      </Box>
      <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
        {t("pages.weather.weatherHeader")}:
      </Typography>
      <Typography variant="body1" align="center" sx={{ marginTop: 1 }}>
        {t("pages.weather.temperature")}: {weather.temperature} °C
      </Typography>
    </Box>
  );
};

export default Weather;
