"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../services/user/CreateUserService");
class CreateUserController {
    async handle(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }
        try {
            const createUserService = new CreateUserService_1.CreateUserService();
            const user = await createUserService.execute({
                name,
                email,
                password,
            });
            return res.status(201).json({ user });
        }
        catch (error) {
            return res.status(400).json({ error: error.message || "Erro ao criar usuário" });
        }
    }
}
exports.CreateUserController = CreateUserController;
