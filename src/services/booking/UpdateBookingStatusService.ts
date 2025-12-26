import prismaClient from "../../prisma";

interface UpdateBookingStatusRequest {
    bookingId: string;
    status: "pendente" | "confirmado" | "cancelado";
    userId: string;
}

class UpdateBookingStatusService {
    async execute({ bookingId, status, userId }: UpdateBookingStatusRequest) {
        const statusMap: Record<
            "pendente" | "confirmado" | "cancelado",
            "PENDING" | "CONFIRMED" | "CANCELLED"
        > = {
            pendente: "PENDING",
            confirmado: "CONFIRMED",
            cancelado: "CANCELLED",
        };

        const prismaStatus = statusMap[status];
        if (!prismaStatus) {
            throw new Error("Status inválido");
        }

        const booking = await prismaClient.booking.findUnique({
            where: { id: bookingId },
            include: { car: true },
        });

        if (!booking) {
            throw new Error("Reserva não encontrada");
        }

        if (booking.car.ownerId !== userId) {
            throw new Error("Você não tem permissão para alterar esta reserva");
        }

        const updatedBooking = await prismaClient.booking.update({
            where: { id: bookingId },
            data: { status: prismaStatus },
            include: { car: true },
        });

        const reverseStatusMap: Record<
            "PENDING" | "CONFIRMED" | "CANCELLED",
            "pendente" | "confirmado" | "cancelado"
        > = {
            PENDING: "pendente",
            CONFIRMED: "confirmado",
            CANCELLED: "cancelado",
        };

        return {
            ...updatedBooking,
            status: reverseStatusMap[updatedBooking.status],
        };
    }
}

export { UpdateBookingStatusService };
