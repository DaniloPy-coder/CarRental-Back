"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("../config/multer"));
const express_1 = require("express");
// ===== CONTROLLERS =====
const CreateUserController_1 = require("../controllers/user/CreateUserController");
const AuthUserController_1 = require("../controllers/user/AuthUserController");
const ChangeRoleController_1 = require("../controllers/user/ChangeRoleController");
const DetailUserController_1 = require("../controllers/user/DetailUserController");
const DashboardController_1 = require("../controllers/user/DashboardController");
const UpdateProfileImageController_1 = require("../controllers/user/UpdateProfileImageController");
const CreateCarController_1 = require("../controllers/car/CreateCarController");
const GetCarByIdController_1 = require("../controllers/car/GetCarByIdController");
const ListAvailableCarsController_1 = require("../controllers/car/ListAvailableCarsController");
const ListCarsController_1 = require("../controllers/car/ListCarsController");
const ListOwnerCarsController_1 = require("../controllers/car/ListOwnerCarsController");
const ListPublicCarsController_1 = require("../controllers/car/ListPublicCarsController");
const UpdateCarController_1 = require("../controllers/car/UpdateCarController");
const DeleteCarController_1 = require("../controllers/car/DeleteCarController");
const ToggleAvailabilityController_1 = require("../controllers/car/ToggleAvailabilityController");
const CreateBookingController_1 = require("../controllers/booking/CreateBookingController");
const ListUserBookingsController_1 = require("../controllers/booking/ListUserBookingsController");
const ListOwnerBookingsController_1 = require("../controllers/booking/ListOwnerBookingsController");
const UpdateBookingStatusController_1 = require("../controllers/booking/UpdateBookingStatusController");
const CheckAvailabilityCarController_1 = require("../controllers/booking/CheckAvailabilityCarController");
const CheckAvailabilityCarsController_1 = require("../controllers/booking/CheckAvailabilityCarsController");
// ===== MIDDLEWARE =====
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
// ===== CONFIG =====
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)(multer_2.default.upload());
// ===== USERS =====
const createUserController = new CreateUserController_1.CreateUserController();
const authUserController = new AuthUserController_1.AuthUserController();
const changeUserRoleController = new ChangeRoleController_1.ChangeUserRoleController();
const detailUserController = new DetailUserController_1.DetailUserController();
const dashboardController = new DashboardController_1.DashboardController();
const updateProfileImageController = new UpdateProfileImageController_1.UpdateProfileImageController();
router.post("/users", createUserController.handle.bind(createUserController));
router.post("/session", authUserController.handle.bind(authUserController));
router.patch("/users/change-role", isAuthenticated_1.isAuthenticated, changeUserRoleController.handle.bind(changeUserRoleController));
router.get("/me", isAuthenticated_1.isAuthenticated, detailUserController.handle.bind(detailUserController));
router.get("/dashboard", isAuthenticated_1.isAuthenticated, dashboardController.handle.bind(dashboardController));
router.put("/users/update-image", isAuthenticated_1.isAuthenticated, upload.single("image"), updateProfileImageController.handle.bind(updateProfileImageController));
// ===== CARS =====
const createCarController = new CreateCarController_1.CreateCarController();
const getCarByIdController = new GetCarByIdController_1.GetCarByIdController();
const listAvailableCarsController = new ListAvailableCarsController_1.ListAvailableCarsController();
const listCarsController = new ListCarsController_1.ListCarsController();
const listPublicCarsController = new ListPublicCarsController_1.ListPublicCarsController();
const listOwnerCarsController = new ListOwnerCarsController_1.ListOwnerCarsController();
const updateCarController = new UpdateCarController_1.UpdateCarController();
const deleteCarController = new DeleteCarController_1.DeleteCarController();
const toggleAvailabilityController = new ToggleAvailabilityController_1.ToggleAvailabilityController();
// Rotas privadas
router.post("/cars", isAuthenticated_1.isAuthenticated, upload.single("file"), createCarController.handle.bind(createCarController));
router.get("/owner/cars", isAuthenticated_1.isAuthenticated, listOwnerCarsController.handle.bind(listOwnerCarsController));
router.put("/cars/:id", isAuthenticated_1.isAuthenticated, upload.single("file"), updateCarController.handle.bind(updateCarController));
router.delete("/cars/:id", isAuthenticated_1.isAuthenticated, deleteCarController.handle.bind(deleteCarController));
router.patch("/cars/:id/toggleAvailability", isAuthenticated_1.isAuthenticated, toggleAvailabilityController.handle.bind(toggleAvailabilityController));
// Rotas públicas
router.get("/cars/public", listPublicCarsController.handle.bind(listPublicCarsController));
router.get("/cars/public/availability", listAvailableCarsController.handle.bind(listAvailableCarsController));
router.get("/cars", listCarsController.handle.bind(listCarsController));
router.get("/cars/:id", getCarByIdController.handle.bind(getCarByIdController));
// ===== BOOKINGS =====
const createBookingController = new CreateBookingController_1.CreateBookingController();
const listUserBookingsController = new ListUserBookingsController_1.ListUserBookingsController();
const listOwnerBookingsController = new ListOwnerBookingsController_1.ListOwnerBookingsController();
const updateBookingStatusController = new UpdateBookingStatusController_1.UpdateBookingStatusController();
const checkAvailabilityCarController = new CheckAvailabilityCarController_1.CheckAvailabilityCarController();
const checkAvailabilityCarsController = new CheckAvailabilityCarsController_1.CheckAvailabilityCarsController();
// Rotas de booking
router.post("/bookings", isAuthenticated_1.isAuthenticated, createBookingController.handle.bind(createBookingController));
router.get("/bookings/user", isAuthenticated_1.isAuthenticated, listUserBookingsController.handle.bind(listUserBookingsController));
router.get("/bookings/owner", isAuthenticated_1.isAuthenticated, listOwnerBookingsController.handle.bind(listOwnerBookingsController));
router.patch("/bookings/:id/status", isAuthenticated_1.isAuthenticated, updateBookingStatusController.handle.bind(updateBookingStatusController));
// Checagem de disponibilidade
router.get("/cars/availability", checkAvailabilityCarsController.handle.bind(checkAvailabilityCarsController));
router.get("/cars/:carId/availability", checkAvailabilityCarController.handle.bind(checkAvailabilityCarController));
exports.default = router;
