import express from "express"
import { register,login ,inventory2,inventory,getMyProfile} from "../Controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { getAssignIssue ,empID} from "../Controllers/report.js";
const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/inventory/:email",inventory)
router.post("/inventoryy",inventory2)
router.get("/usersme",isAuthenticated,getMyProfile)
router.get("/getAssignedIssue",getAssignIssue)
router.get("/getEmp/:empID",empID);


export default router;