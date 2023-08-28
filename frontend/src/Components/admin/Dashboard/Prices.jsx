import CardPricing from "./CardPricing";

export default function Prices() {

    return (
        <div className="Prices" style={{ gridTemplateColumns: 'repeat(' + cardsData.length + ',1fr)' }}>
            {cardsData.map((card) => {
                return (
                    <CardPricing
                        key={card.id}
                        color={card.color}
                        title={card.title}
                        price={card.price}
                        options={card.options}
                    />
                );
            })}
        </div>
    );
}

const cardsData = [
    {
        id: 1,
        color: "green",
        title: "Free Plan",
        description: "Lorem ipsum",
        price: 19.99,
        recurrency: 14.99,
        mostPopular: false,
        options: ["2TB Storage", "100 E-mails"],
    },

    {
        id: 3,
        color: "purple",
        title: "Medium Plan",
        description: "Lorem ipsum",
        price: 69.99,
        recurrency: 59.99,
        mostPopular: true,
        options: ["10TB Storage", "500 E-mails", "20 Accounts", "24/7 Support"],
    },
    {
        id: 4,
        color: "gold",
        title: "Pro Plan",
        description: "Lorem ipsum",
        price: 99.99,
        recurrency: 84.99,
        mostPopular: false,
        options: [
            "50TB Storage",
            "Unlimited E-mails",
            "Unlimited Accounts",
            "24/7 Support",
        ],
    },
];
