import multer from "multer";
import uploadConfig from "../config/multer";
import { Router } from "express";

// ===== CONTROLLERS =====
import { CreateUserController } from "../controllers/user/CreateUserController";
import { AuthUserController } from "../controllers/user/AuthUserController";
import { ChangeUserRoleController } from "../controllers/user/ChangeRoleController";
import { DetailUserController } from "../controllers/user/DetailUserController";
import { DashboardController } from "../controllers/user/DashboardController";
import { UpdateProfileImageController } from "../controllers/user/UpdateProfileImageController";

import { CreateCarController } from "../controllers/car/CreateCarController";
import { GetCarByIdController } from "../controllers/car/GetCarByIdController";
import { ListAvailableCarsController } from "../controllers/car/ListAvailableCarsController";
import { ListCarsController } from "../controllers/car/ListCarsController";
import { ListOwnerCarsController } from "../controllers/car/ListOwnerCarsController";
import { ListPublicCarsController } from "../controllers/car/ListPublicCarsController";
import { UpdateCarController } from "../controllers/car/UpdateCarController";
import { DeleteCarController } from "../controllers/car/DeleteCarController";
import { ToggleAvailabilityController } from "../controllers/car/ToggleAvailabilityController";

import { CreateBookingController } from "../controllers/booking/CreateBookingController";
import { ListUserBookingsController } from "../controllers/booking/ListUserBookingsController";
import { ListOwnerBookingsController } from "../controllers/booking/ListOwnerBookingsController";
import { UpdateBookingStatusController } from "../controllers/booking/UpdateBookingStatusController";
import { CheckAvailabilityCarController } from "../controllers/booking/CheckAvailabilityCarController";
import { CheckAvailabilityCarsController } from "../controllers/booking/CheckAvailabilityCarsController";

// ===== MIDDLEWARE =====
import { isAuthenticated } from "../middlewares/isAuthenticated";

// ===== CONFIG =====
const router = Router();
const upload = multer(uploadConfig.upload());

// ===== USERS =====
const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const changeUserRoleController = new ChangeUserRoleController();
const detailUserController = new DetailUserController();
const dashboardController = new DashboardController();
const updateProfileImageController = new UpdateProfileImageController();

router.post("/users", createUserController.handle.bind(createUserController));
router.post("/session", authUserController.handle.bind(authUserController));
router.patch("/users/change-role", isAuthenticated, changeUserRoleController.handle.bind(changeUserRoleController));
router.get("/me", isAuthenticated, detailUserController.handle.bind(detailUserController));
router.get("/dashboard", isAuthenticated, dashboardController.handle.bind(dashboardController));
router.put("/users/update-image", isAuthenticated, upload.single("image"), updateProfileImageController.handle.bind(updateProfileImageController));

// ===== CARS =====
const createCarController = new CreateCarController();
const getCarByIdController = new GetCarByIdController();
const listAvailableCarsController = new ListAvailableCarsController();
const listCarsController = new ListCarsController();
const listPublicCarsController = new ListPublicCarsController();
const listOwnerCarsController = new ListOwnerCarsController();
const updateCarController = new UpdateCarController();
const deleteCarController = new DeleteCarController();
const toggleAvailabilityController = new ToggleAvailabilityController();

// Rotas privadas
router.post("/cars", isAuthenticated, upload.single("file"), createCarController.handle.bind(createCarController));
router.get("/owner/cars", isAuthenticated, listOwnerCarsController.handle.bind(listOwnerCarsController));
router.put("/cars/:id", isAuthenticated, upload.single("file"), updateCarController.handle.bind(updateCarController));
router.delete("/cars/:id", isAuthenticated, deleteCarController.handle.bind(deleteCarController));
router.patch("/cars/:id/toggleAvailability", isAuthenticated, toggleAvailabilityController.handle.bind(toggleAvailabilityController));

// Rotas públicas
router.get("/cars/public", listPublicCarsController.handle.bind(listPublicCarsController));
router.get("/cars/public/availability", listAvailableCarsController.handle.bind(listAvailableCarsController));
router.get("/cars", listCarsController.handle.bind(listCarsController));
router.get("/cars/:id", getCarByIdController.handle.bind(getCarByIdController));

// ===== BOOKINGS =====
const createBookingController = new CreateBookingController();
const listUserBookingsController = new ListUserBookingsController();
const listOwnerBookingsController = new ListOwnerBookingsController();
const updateBookingStatusController = new UpdateBookingStatusController();
const checkAvailabilityCarController = new CheckAvailabilityCarController();
const checkAvailabilityCarsController = new CheckAvailabilityCarsController();

// Rotas de booking
router.post("/bookings", isAuthenticated, createBookingController.handle.bind(createBookingController));
router.get("/bookings/user", isAuthenticated, listUserBookingsController.handle.bind(listUserBookingsController));
router.get("/bookings/owner", isAuthenticated, listOwnerBookingsController.handle.bind(listOwnerBookingsController));
router.patch("/bookings/:id/status", isAuthenticated, updateBookingStatusController.handle.bind(updateBookingStatusController));

// Checagem de disponibilidade
router.get("/cars/availability", checkAvailabilityCarsController.handle.bind(checkAvailabilityCarsController));
router.get("/cars/:carId/availability", checkAvailabilityCarController.handle.bind(checkAvailabilityCarController));

export default router;
