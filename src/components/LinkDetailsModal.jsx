import PropTypes from "prop-types";

import {
    Browsers,
    Code,
    PaintBrush,
    Lightning,
    Robot,
    Rocket,
    Terminal,
    Layout,
    Database,
    Cloud,
    Globe,
    Info,
    Star,
    Book,
    Pencil,
    Lightbulb,
} from "@phosphor-icons/react";

const LinkDetailsModal = ({ link, isOpen, onClose }) => {
    if (!isOpen) return null;

    const getColourForCategory = (category) => {
        const colours = {
            Browser: "#8BC34A",
            Essentials: "#F46B6C",
            Development: "#4ECDC5",
            Design: "#F7AA80",
            Productivity: "#34A85A",
            Resources: "#292F37",
            "Project Management": "#F7B4B4",
            Documentation: "#3498db",
            "Note Taking": "#FFC107",
            "Version Control": "#3498db",
        };

        return colours[category] || "FFFFFF";
    };

    const getIconForCategory = (category) => {
        const icons = {
            Browser: Browsers,
            Development: Code,
            Design: PaintBrush,
            Productivity: Lightning,
            AI: Robot,
            "Project Management": Rocket,
            Terminal: Terminal,
            UI: Layout,
            Database: Database,
            Cloud: Cloud,
            Documentation: Book,
            "Note Taking": Pencil,
            Inspiration: Lightbulb,
        };

        const Icon = icons[category] || Globe;
        return <Icon weight="bold" className="w-5 h-5" />;
    };

    return (
        <div
            className="fixed inset-0 z-[100]"
            style={{ position: "fixed", height: "100vh" }}
        >
            <div
                className="fixed inset-0 bg-custom-bg/30 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="relative grainy bg-custom-bg rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                    {/* Header with icon */}
                    <div className="flex items-center space-x-4 mb-6">
                        <div
                            className="flex h-12 w-12 items-center justify-center rounded-md text-white text-sm font-medium shadow-sm"
                            style={{
                                backgroundColor: `${getColourForCategory(
                                    link.category
                                )}`,
                            }}
                        >
                            <span className="block">
                                {getIconForCategory(link.category)}
                            </span>
                        </div>
                        <div>
                            <h2 className="text-xl font-heading text-text-900">
                                {link.title}
                            </h2>
                            <p className="text-sm font-heading uppercase text-text-500">
                                {link.category}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-6">
                        <div className="font-body text-sm">
                            <p>{link.description}</p>
                        </div>

                        {/* Use Case */}
                        {link.useCase && (
                            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                                <h3 className="text-base font-medium font-heading text-text-900 mb-2">
                                    Why use it?
                                </h3>
                                <p className="text-sm font-body text-text-600">
                                    {link.useCase}
                                </p>
                            </div>
                        )}

                        {/* Personal Notes */}
                        {link.comments && (
                            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                                <h3 className="text-base font-medium font-heading text-text-900 mb-2">
                                    Personal Notes
                                </h3>
                                <p className="text-sm font-body text-text-600">
                                    {link.comments}
                                </p>
                            </div>
                        )}

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-zinc-200/50">
                            <div>
                                <p className="text-xs font-medium font-heading text-text-500">
                                    Added On
                                </p>
                                <p className="mt-1 text-sm font-body text-text-900">
                                    {new Date(
                                        link.dateAdded
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-medium font-heading text-text-500">
                                    Website
                                </p>
                                <p className="mt-1 text-sm font-body text-text-900">
                                    {new URL(link.url).hostname.replace(
                                        "www.",
                                        ""
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-4">
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium font-heading uppercase text-text-900 bg-white/80 hover:bg-white/90 rounded-lg transition-colors backdrop-blur-sm"
                            >
                                Visit Website
                                <svg
                                    className="w-4 h-4 ml-2"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/20 text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

LinkDetailsModal.propTypes = {
    link: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        dateAdded: PropTypes.string.isRequired,
        useCase: PropTypes.string,
        comments: PropTypes.string,
    }),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default LinkDetailsModal;
