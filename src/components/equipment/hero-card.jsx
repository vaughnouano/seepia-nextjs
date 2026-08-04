import Image from "next/image";

export default function HeroCard({ equipment }) {
  return (
    <div className="container">
      <div className="card">
        <Image src={equipment.image_url} fill alt={equipment.equipment_name} />
        <div className="information-card">
          <div className="tag-container">{/* ignore for now */}</div>
          <div className="text-information">
            <h1 className="equipmentTitle">{equipment.equipment_name}</h1>
            <p className="description">{equipment.description}</p>
          </div>
          {/* ignore button for now */}
        </div>
      </div>
    </div>
  );
}
