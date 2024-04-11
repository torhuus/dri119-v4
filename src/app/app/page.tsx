import { Token, getToken } from "@/actions/auth";
import {
  getDashboardData,
  getTicketCounts,
  secondsToHumanized,
} from "@/actions/stas";
import moment from "moment";
require("moment/locale/nb");

const AppPage = async () => {
  const token = (await getToken()) as Token;
  const stats = await getDashboardData(token.exerciseId);
  const counts = await getTicketCounts(token.exerciseId);
  moment.locale("nb");

  return "Snarveier til ulike deler av applikasjonen";
};

export default AppPage;
