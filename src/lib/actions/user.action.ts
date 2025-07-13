"use server";

import connectToDb from "../DB/connectio";
import UserModel from "../DB/models/User.Model";

export const SignUpAction: ActionResponse<SignUpParams> = async (data: SignUpParams) => {
  try {
    await connectToDb();
    const { email, name, password } = data;
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return { message: "Email already exist", status: 409 };
    }
    const result = await UserModel.create([{ email, name, password }]);
    console.log({ result });
    return { message: "user register successfully", status: 201 };
  } catch (error) {
    console.log({ error });
    return { message: "Server Error", status: 500 };
  }
};

export const DeleteUserAction: ActionResponse<string> = async (id: string) => {
  try {
    await connectToDb();
    const checkUser = await UserModel.findById(id);
    if (!checkUser) {
      return { message: "In-valid user id", status: 404 };
    }
    const result = await UserModel.findByIdAndDelete(id);
    console.log({ result });
    return { message: "user deleted successfully", status: 200 };
  } catch (error) {
    console.log({ error });

    return { message: "Server Error", status: 500 };
  }
};

export const UpdateUserAction: ActionResponse<UpdateUserActionParams> = async (data: UpdateUserActionParams) => {
  try {
    await connectToDb();
    const checkUser = await UserModel.findById(data.id);
    if (!checkUser) {
      return { message: "In-valid user id", status: 404 };
    }
    if (data.email) {
      const result = await UserModel.findOne({ _id: { $ne: data.id }, email: data.email });
      if (result) {
        return { message: "email aready exist", status: 409 };
      }
    }
    const result = await UserModel.findOneAndUpdate({ _id: data.id }, { ...data, $inc: { __v: 1 } });
    console.log({ result });

    return { message: "user updated successfully", status: 200 };
  } catch (error) {
    console.log({ error });

    return { message: "Server Error", status: 500 };
  }
};
