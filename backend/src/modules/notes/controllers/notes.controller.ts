import type { Request, Response, RequestHandler } from "express";

//services
import {
  createNotesService,
  getAllNotesService,
  patchUpdateNotesService,
  deleteNotesService,
  pinNotesService,
  unPinNotesService,
  getPinnedNotesService,
  getMyNotesService,
  createNotePurchaseService,
  createNoteOrderService,
  verifyPaymentService,
  getPurchasedNotesService,
  getNoteByIdService,
} from "../services/notes.service.js";
// async handler
import { asyncHandler } from "../../../common/utils/asyncHandler.util.js";

import type { NoteResponseDto } from "../types/dtos/notes.response.dto.js";
import type { GetAllNotesResponseDto } from "../types/dtos/getAllNotes.response.dto.js";
import type { GetPinnedNotesResponseDto } from "../types/dtos/getPinnedNotes.response.dto.js";
import type { NoteParamDto } from "../types/dtos/note.params.dto.js";
import type { GetAllNotesQueryDto } from "../types/dtos/getAllNotes.query.dto.js";
import { HTTP_STATUS } from "../../../common/constants/httpStatus.constant.js";
import { MESSAGES } from "../../../common/constants/messages.constant.js";
import {
  createNotesDto,
  patchUpdateNotesDto,
} from "../validations/notes.validations.js";
import { logger } from "../../../common/services/logger.service.js";
import { AppError } from "../../../common/utils/appError.util.js";

export const createNotes = asyncHandler(
  async (
    req: Request<{}, NoteResponseDto, createNotesDto>,
    res: Response<NoteResponseDto>,
  ) => {
    const { note_name, note_content,price,is_published } = req.body;
    const user_id = req.user_id!;

    logger.info({
      message: "Create notes request received",
      title: note_name,
    });

    await createNotesService(note_name, note_content, user_id,price,is_published);

    logger.info({
      message: "Note created successfully",
    });
    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: MESSAGES.PRODUCT.CREATED_SUCCESS,
    });
  },
);

export const getAllNotes = asyncHandler(
  async (
    req: Request<{}, GetAllNotesResponseDto, {}, GetAllNotesQueryDto>,
    res: Response<GetAllNotesResponseDto>,
  ) => {
    logger.info({
      message: "Get all notes request received",
    });
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const notes = await getAllNotesService(page, limit, search);
    logger.info({
      message: "Notes received successfully",
    });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: notes,
    });
  },
);

export const patchUpdateNotes: RequestHandler<
  NoteParamDto,
  NoteResponseDto,
  patchUpdateNotesDto
> = asyncHandler(async (req, res) => {
  const { note_id } = req.params;
  const user_id = req.user_id!;
  const { new_note_name, new_note_content } = req.body;

  const notes = await patchUpdateNotesService(
    note_id,
    new_note_name,
    new_note_content,
    user_id,
  );

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: MESSAGES.PRODUCT.UPDATED_SUCCESS,
  });
});

// export const patchUpdateNotes = asyncHandler<
//   NoteParamDto,
//   NoteResponseDto,
//   patchUpdateNotesDto
// >(async (req, res) => {
//   logger.info({
//     message:"Patch update notes request received"
//   })
//  const { note_id } = req.params

//  await patchUpdateNotesService(
//    note_id,
//    req.body.new_note_name,
//    req.body.new_note_content,
//    req.user_id!
//  )
//  logger.info({
//   message:"Patch update successfully"
//  })
//  res.status(200).json({
//    success: true,
//    message: MESSAGES.PRODUCT.UPDATED_SUCCESS
//  })
// })

export const deleteNotes = asyncHandler(
  async (
    req: Request<NoteParamDto, NoteResponseDto, {}, {}>,
    res: Response<NoteResponseDto>,
  ) => {
    const { note_id } = req.params;
    const user_id = req.user_id!;

    await deleteNotesService(note_id, user_id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.PRODUCT.DELETE_SUCCESS,
    });
  },
);

export const pinNotes = asyncHandler(
  async (
    req: Request<NoteParamDto, NoteResponseDto, {}, {}>,
    res: Response<NoteResponseDto>,
  ) => {
    const { note_id } = req.params;
    const user_id = req.user_id!;

    await pinNotesService(note_id, user_id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.PRODUCT.PINNED,
    });
  },
);

export const unPinNotes = asyncHandler(
  async (
    req: Request<NoteParamDto, NoteResponseDto, NoteResponseDto>,
    res: Response<NoteResponseDto>,
  ) => {
    const user_id = req.user_id!;
    const { note_id } = req.params;

    await unPinNotesService(user_id, note_id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.PRODUCT.UNPINNED,
    });
  },
);

export const getPinnedNotes = asyncHandler(
  async (
    req: Request<{}, GetPinnedNotesResponseDto, {}, {}>,
    res: Response<GetPinnedNotesResponseDto>,
  ) => {
    const user_id = req.user_id!;

    const user = await getPinnedNotesService(user_id);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: user,
      count: user.length,
    });
  },
);

export const getMyNotes = asyncHandler(async (req: Request, res: Response) => {
  const user_id = req.user_id!;
  const { note_id } = req.params;

  const notes = await getMyNotesService(user_id);

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    data: notes,
    count: notes.length,
  });
});

// export const createNotePurchase = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { note_id } = req.params;

//     const buyer_id = req.user_id!;

//     const idempotency_key = req.headers["idempotency-key"] as
//       | string
//       | undefined;

//     if (!idempotency_key) {
//       throw new AppError(
//         MESSAGES.COMMON.IDEMPOTENCY_KEY_REQUIRED,
//         HTTP_STATUS.BAD_REQUEST,
//       );
//     }

//     const purchase = await createNotePurchaseService(
//       note_id,
//       buyer_id,
//       idempotency_key,
//     );

//     return res.status(HTTP_STATUS.CREATED).json({
//       success: true,
//       message: MESSAGES.PRODUCT.PURCHASE_SUCCESS,
//       data: purchase,
//     });
//   },
// );

export const createNoteOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const { note_id } = req.params;
    const user_id = req.user_id;
    // const idempotency_key = req.headers["idempotency-key"] as
    //   | string
    //   | undefined;

    // if (!idempotency_key) {
    //   throw new AppError(
    //     MESSAGES.COMMON.IDEMPOTENCY_KEY_REQUIRED,
    //     HTTP_STATUS.BAD_REQUEST,
    //   );
    // }
    const note_order = await createNoteOrderService(
      note_id,
      user_id,

    );

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: note_order,
    });
  },
);

export const verifyPyament = asyncHandler(async (req, res) => {
  const { note_id } = req.params;
  const buyer_id = req.user_id!;
  const idempotency_key = req.headers["idempotency-key"] as string | undefined;

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const purchase = await verifyPaymentService(
    note_id,
    buyer_id,
    idempotency_key,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  );

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: MESSAGES.COMMON.PAYMENT_VERIFIED,
    data: purchase,
  });
});

export const getPurchasedNotes = asyncHandler(
  async (req: Request, res: Response) => {
    const user_id = req.user_id
    const purchasedNotes = await getPurchasedNotesService(user_id)

    return res.status(HTTP_STATUS.OK).json({
      success:true,
      data:purchasedNotes
    })
  },
);


export const getNoteById = asyncHandler(async(req:Request,res:Response)=>{
    const {note_id} = req.params
    const user_id = req.user_id
    const note = await getNoteByIdService(note_id,user_id)

    return res.status(HTTP_STATUS.OK).json({
      success:true,
      data:note
    })
})