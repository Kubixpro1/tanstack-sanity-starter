import { createFileRoute } from "@tanstack/react-router";
import { getBusinessInfo, getGalleryItems, urlFor } from "../lib/sanity";
import { ContactForm } from "../components/ContactForm";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [business, gallery] = await Promise.all([
      getBusinessInfo(),
      getGalleryItems(),
    ]);
    return { business, gallery };
  },
  component: HomePage,
});

function HomePage() {
  const { business, gallery } = Route.useLoaderData();

  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">{business?.tagline ?? "Welcome"}</p>
          <h1>{business?.name ?? "Business Name"}</h1>
          <a href="#contact" className="btn">Get in touch</a>
        </div>
      </section>

      {/* ── GALLERY ── */}
      {gallery?.length > 0 && (
        <section className="section" id="gallery">
          <div className="container">
            <h2 className="section-title">Our Work</h2>
            <div className="gallery-grid">
              {gallery.map((item: any) => (
                <div key={item._id} className="gallery-card">
                  <div className="gallery-img-wrap">
                    <img
                      src={urlFor(item.image).width(600).height(450).fit("crop").url()}
                      alt={item.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="gallery-info">
                    <span className="gallery-tag">{item.category}</span>
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT / HOURS ── */}
      {business?.openingHours?.length > 0 && (
        <section className="section section-alt" id="hours">
          <div className="container container-narrow">
            <h2 className="section-title">Opening Hours</h2>
            <table className="hours-table">
              <tbody>
                {business.openingHours.map((h: any, i: number) => (
                  <tr key={i}>
                    <td>{h.days}</td>
                    <td>{h.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── CONTACT ── */}
      <section className="section" id="contact">
        <div className="container container-narrow">
          <h2 className="section-title">Contact Us</h2>
          {business?.address && <p className="contact-detail">📍 {business.address}</p>}
          {business?.phone && <p className="contact-detail">📞 <a href={`tel:${business.phone}`}>{business.phone}</a></p>}
          {business?.email && <p className="contact-detail">✉️ <a href={`mailto:${business.email}`}>{business.email}</a></p>}
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
