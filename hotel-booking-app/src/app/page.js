import hotels from "./hotels/hotels";

export default function Home() {
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Hotel Booking</h1>
      <p className="mb-4 text-gray-600">
        Browse hotels and book them. Bookings are processed through the built-in
        API.
      </p>
      <ul className="list-none p-0">
        {hotels.map((hotel) => (
          <li
            key={hotel.id}
            className="mb-6 border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
          >
            <h2 className="text-xl font-semibold m-0">{hotel.name}</h2>
            <p className="my-2 text-gray-700">{hotel.location}</p>
            <p className="my-2 text-gray-500">{hotel.description}</p>
            <a
              href={`/hotels/${hotel.id}`}
              className="text-blue-600 underline hover:no-underline"
            >
              View Details
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
