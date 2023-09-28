import {
	TOUR_GUIDE_ADD_REQUEST,
	TOUR_GUIDE_ADD_SUCCESS,
	TOUR_GUIDE_ADD_FAIL,
	TOUR_GUIDE_VIEW_REQUEST,
	TOUR_GUIDE_VIEW_SUCCESS,
	TOUR_GUIDE_VIEW_FAIL,
	TOUR_GUIDE_UPDATE_REQUEST,
	TOUR_GUIDE_UPDATE_SUCCESS,
	TOUR_GUIDE_UPDATE_FAIL,
	TOUR_GUIDE_DELETE_REQUEST,
	TOUR_GUIDE_DELETE_SUCCESS,
	TOUR_GUIDE_DELETE_FAIL,
	TOUR_GUIDE_CUSTOMER_VIEW_REQUEST,
	TOUR_GUIDE_CUSTOMER_VIEW_SUCCESS,
	TOUR_GUIDE_CUSTOMER_VIEW_FAIL,
} from "../../constants/TourGuideConstants/TourGuideConstants";
import axios from "axios";
import swal from "sweetalert";
import { API_ENDPOINT } from "../../config";

export const GuideAddAction =
	(name, gender, language, location, description, fee, phoneNumber) => async (dispatch, getState) => {
		try {
			dispatch({
				type: TOUR_GUIDE_ADD_REQUEST,
			});

			const { data } = await axios.post(`${API_ENDPOINT}/guide/admin/add`, {
				name,
				gender,
				language,
				location,
				description,
				fee,
				phoneNumber,
			});

			swal({
				title: "Success !!!",
				text: "Tour guide Details Successfully Submitted.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			dispatch({
				type: TOUR_GUIDE_ADD_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = "Guide creation failed";
			dispatch({
				type: TOUR_GUIDE_ADD_FAIL,
				payload: message,
			});

			swal({
				title: "Error!",
				text: "Something is Wrong",
				type: "error",
			});
		}
	};

export const GuideListAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: TOUR_GUIDE_VIEW_REQUEST,
		});

		const { data } = await axios.get(`${API_ENDPOINT}/guide/admin/get`);

		dispatch({
			type: TOUR_GUIDE_VIEW_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: TOUR_GUIDE_VIEW_FAIL,
			payload: message,
		});
	}
};

export const CustomerGuideListAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: TOUR_GUIDE_CUSTOMER_VIEW_REQUEST,
		});

		const { data } = await axios.get(`${API_ENDPOINT}/guide/customer/get`);
		console.log(data);
		dispatch({
			type: TOUR_GUIDE_CUSTOMER_VIEW_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: TOUR_GUIDE_CUSTOMER_VIEW_FAIL,
			payload: message,
		});
	}
};

export const GuideUpdateAction =
	(id, name, gender, language, location, description, fee, phoneNumber) => async (dispatch, getState) => {
		try {
			dispatch({
				type: TOUR_GUIDE_UPDATE_REQUEST,
			});

			const { data } = await axios.put(`${API_ENDPOINT}/guide/admin/get/${id}`, {
				name,
				gender,
				language,
				location,
				description,
				fee,
				phoneNumber,
			});
			dispatch({
				type: TOUR_GUIDE_UPDATE_SUCCESS,
				payload: data,
			});
			swal({
				title: "Success !!!",
				text: "Tour guide details  successfully updated.",
				icon: "success",
				timer: 2000,
				button: false,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: TOUR_GUIDE_UPDATE_FAIL,
				payload: message,
			});
		}
	};

export const GuideDeleteAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: TOUR_GUIDE_DELETE_REQUEST,
		});

		const { data } = await axios.delete(`${API_ENDPOINT}/guide/admin/get/${id}`);

		dispatch({
			type: TOUR_GUIDE_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: TOUR_GUIDE_DELETE_FAIL,
			payload: message,
		});
	}
};
