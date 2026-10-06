import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CommonButton from "./CommonButton/CommonButton";
import { reservationSchema } from "../validation/schemas";
import { useReservations } from "../hooks";

const Reservation = () => {
  const navigate = useNavigate();
  const { createReservation, actionLoading } = useReservations();
  const todayDate = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(reservationSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const resultAction = await createReservation(formData);
      if (createReservation.rejected?.match?.(resultAction) || resultAction?.error) {
        toast.error(resultAction.payload || "Failed to make reservation");
      } else {
        toast.success(resultAction.payload?.message || "Reservation confirmed successfully!");
        reset();
        navigate("/success");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to make reservation");
    }
  };

  const isPending = isSubmitting || actionLoading;

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="Reservation preview" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A RESERVATION</h1>
            <p>For Further Inquiries, Please Call +1 (555) 234-5678</p>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="form_row">
                <div className="form_field">
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("firstName")}
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  {errors.firstName && (
                    <span className="field_error">{errors.firstName.message}</span>
                  )}
                </div>

                <div className="form_field">
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName")}
                    aria-invalid={errors.lastName ? "true" : "false"}
                  />
                  {errors.lastName && (
                    <span className="field_error">{errors.lastName.message}</span>
                  )}
                </div>
              </div>

              <div className="form_row">
                <div className="form_field">
                  <input
                    type="date"
                    min={todayDate}
                    placeholder="Date"
                    {...register("date")}
                    aria-invalid={errors.date ? "true" : "false"}
                  />
                  {errors.date && (
                    <span className="field_error">{errors.date.message}</span>
                  )}
                </div>

                <div className="form_field">
                  <input
                    type="time"
                    placeholder="Time"
                    {...register("time")}
                    aria-invalid={errors.time ? "true" : "false"}
                  />
                  {errors.time && (
                    <span className="field_error">{errors.time.message}</span>
                  )}
                </div>
              </div>

              <div className="form_row">
                <div className="form_field">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="email_tag"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <span className="field_error">{errors.email.message}</span>
                  )}
                </div>

                <div className="form_field">
                  <input
                    type="tel"
                    placeholder="Phone (10 Digits)"
                    maxLength={10}
                    {...register("phone")}
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && (
                    <span className="field_error">{errors.phone.message}</span>
                  )}
                </div>
              </div>

              <div className="reservation_btn_row">
                <CommonButton
                  text={isPending ? "RESERVING..." : "RESERVE NOW"}
                  type="submit"
                  disabled={isPending}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
