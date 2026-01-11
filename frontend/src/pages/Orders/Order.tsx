import { useEffect } from "react"
import {Link, useParams} from "react-router-dom"
import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js"
import {useSelector} from "react-redux"
import {toast} from "react-toastify"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import {useDeliverOrderMutation, useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation} from "../../redux/api/orderApiSlice"
import {RootState} from "../../redux/store"

const Order = () => {
    const {id: orderId} = useParams()
    const {data: order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId)
    const [payOrder, {isLoading: loadingPay}] = usePayOrderMutation()
    const [deliverOrder, {isLoading: loadingDeliver}] = useDeliverOrderMutation()
    const {userInfo} = useSelector((state: RootState) => state.auth)
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer()
    const {data: paypal, isLoading: loadingPaypal, error: errorPaypal} = useGetPaypalClientIdQuery(undefined)

    useEffect(() => {
        if (!errorPaypal && !loadingPaypal && paypal?.clientId) {
            const loadPaypalScript = async () => {
                paypalDispatch({
                    type: "resetOptions" as any,
                    value: {
                        clientId: paypal.clientId,
                        currency: "USD",
                    },
                } as any)
                paypalDispatch({type: "setLoadingStatus" as any, value: "pending" as any})
            }
            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPaypalScript()
                }
            }
        }
    }, [paypalDispatch, errorPaypal, loadingPaypal, order, paypal])

    const createOrder = async (data: any, actions: any) => {
        return actions.order.create({
            purchase_units:[{amount : {value: order?.totalPrice}}],
        }).then((orderId: string) => {
            return orderId
        })
    }

    const onApprove = async (data: any, actions: any) => {
        return actions.order.capture().then(async (details: any) => {
            try {
                await payOrder({id: orderId!, details})
                refetch()
                toast.success("Payment successful")
            } catch (error: any) {
                toast.error(error.data.message || error.error)
            }
        })
    }

    const onError = (error: any) => {
        toast.error(error.data.message || error.error)
    }

    const deliverHandler = async () => {
        try {
            await deliverOrder(orderId!)
            refetch()
            toast.success("Order delivered")
        } catch (error: any) {
            toast.error(error.data.message || error.error)
        }
    }

    


    return isLoading ? (
        <Loader />
      ) : error && 'data' in error ? (
        <Message variant="danger">{(error.data as any)?.message || 'An error occurred'}</Message>
      ) : (
        <div className="container flex flex-col ml-[10rem] md:flex-row">
          <div className="md:w-2/3 pr-4">
            <div className="border gray-300 mt-5 pb-4 mb-5">
              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-[80%]">
                    <thead className="border-b-2">
                      <tr>
                        <th className="p-2">Image</th>
                        <th className="p-2">Product</th>
                        <th className="p-2 text-center">Quantity</th>
                        <th className="p-2">Unit Price</th>
                        <th className="p-2">Total</th>
                      </tr>
                    </thead>
    
                    <tbody>
                      {order.orderItems.map((item: any, index: any) => (
                        <tr key={index}>
                          <td className="p-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover"
                            />
                          </td>
    
                          <td className="p-2">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </td>
    
                          <td className="p-2 text-center">{item.quantity}</td>
                          <td className="p-2 text-center">{item.price}</td>
                          <td className="p-2 text-center">
                            $ {(item.quantity * item.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
    
          <div className="md:w-1/3">
            <div className="mt-5 border-gray-300 pb-4 mb-4">
              <h2 className="text-xl font-bold mb-2">Shipping</h2>
              <p className="mb-4 mt-4">
                <strong className="text-pink-500">Order:</strong> {order._id}
              </p>
    
              <p className="mb-4">
                <strong className="text-pink-500">Name:</strong>{" "}
                {order.user.username}
              </p>
    
              <p className="mb-4">
                <strong className="text-pink-500">Email:</strong> {order.user.email}
              </p>
    
              <p className="mb-4">
                <strong className="text-pink-500">Address:</strong>{" "}
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
    
              <p className="mb-4">
                <strong className="text-pink-500">Method:</strong>{" "}
                {order.paymentMethod}
              </p>
    
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </div>
    
            <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>$ {order.itemsPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>$ {order.shippingPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>$ {order.taxPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span>$ {order.totalPrice}</span>
            </div>
    
            {!order.isPaid && (
              <div>
                {loadingPay && <Loader />}{" "}
                {isPending ? (
                  <Loader />
                ) : (
                  <div>
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  </div>
                )}
              </div>
            )}
    
            {loadingDeliver && <Loader />}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <div>
                <button
                  type="button"
                  className="bg-pink-500 text-white w-full py-2"
                  onClick={() => deliverHandler()}
                >
                  Mark As Delivered
                </button>
              </div>
            )}
          </div>
        </div>
      );
    };
    
    export default Order;