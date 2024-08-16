import connect from '../../../../config/'
import FormData from '../../../models/Multi'

export const createPG = async (pgData) => {
  try {
    await connect();
    const newPG = new FormData(pgData);
    await newPG.save();
    return newPG;
  } catch (error) {
    console.error("Error creating PG:", error);
    throw new Error("Failed to create PG.");
  }
};

export const getAllPGs = async () => {
  try {
    await connect();

    const pgs = await FormData.find();
    return pgs;
  } catch (error) {
    console.error("Error fetching PGs:", error);
    throw new Error("Failed to fetch PGs.");
  }
};

export const getPGById = async (id) => {
  try {
    await connect();

    const pg = await FormData.findById(id);
    return pg;
  } catch (error) {
    console.error("Error fetching PG by ID:", error);
    throw new Error("Failed to fetch PG by ID.");
  }
};

export const updatePG = async (id, newData) => {
  try {
    await connect();

    const updatedPG = await FormData.findByIdAndUpdate(id, newData, { new: true });
    return updatedPG;
  } catch (error) {
    console.error("Error updating PG:", error);
    throw new Error("Failed to update PG.");
  }
};

export const deletePG = async (id) => {
  try {
    await connect();

    await FormData.findByIdAndDelete(id);
    return { message: "PG deleted successfully." };
  } catch (error) {
    console.error("Error deleting PG:", error);
    throw new Error("Failed to delete PG.");
  }
};
