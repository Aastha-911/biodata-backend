import Order from "../models/order.model.js";
import Template from "../models/template.model.js";


export const getAnalytics = async (req, res) => {
  try {
    // Date boundaries
    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date();
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday as start
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // ---------------- Orders ----------------
    const totalOrders = await Order.countDocuments();
    const totalEarningsAgg = await Order.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, earnings: { $sum: "$price" } } },
    ]);
    const totalEarnings = totalEarningsAgg[0]?.earnings || 0;

    // Today
    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: startOfToday },
    });
    const todayEarningsAgg = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfToday }, status: "paid" } },
      { $group: { _id: null, earnings: { $sum: "$price" } } },
    ]);
    const todayEarnings = todayEarningsAgg[0]?.earnings || 0;

    // Weekly
    const weeklyOrders = await Order.countDocuments({
      createdAt: { $gte: startOfWeek },
    });
    const weeklyEarningsAgg = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfWeek }, status: "paid" } },
      { $group: { _id: null, earnings: { $sum: "$price" } } },
    ]);
    const weeklyEarnings = weeklyEarningsAgg[0]?.earnings || 0;

    // Monthly
    const monthlyOrders = await Order.countDocuments({
      createdAt: { $gte: startOfMonth },
    });
    const monthlyEarningsAgg = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfMonth }, status: "paid" } },
      { $group: { _id: null, earnings: { $sum: "$price" } } },
    ]);
    const monthlyEarnings = monthlyEarningsAgg[0]?.earnings || 0;

    // ---------------- Templates ----------------
    const totalTemplates = await Template.countDocuments();

    // ---------------- Response ----------------
    res.status(200).json({
      success: true,
      message: "Analytics fetched successfully",
      data: {
        orders: {
          totalOrders,
          totalEarnings,
          today: {
            orders: todayOrders,
            earnings: todayEarnings,
          },
          weekly: {
            orders: weeklyOrders,
            earnings: weeklyEarnings,
          },
          monthly: {
            orders: monthlyOrders,
            earnings: monthlyEarnings,
          },
        },
        templates: {
          totalTemplates,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
      error: error.message,
    });
  }
};
