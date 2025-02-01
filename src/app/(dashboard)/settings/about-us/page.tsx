"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload, Plus, Trash2 } from "lucide-react";
import { uploadImage } from "./upload";

interface Section {
  id: string;
  title: string;
  content: string | string[];
}

interface AboutData {
  description: string;
  sections: Section[];
  stats: {
    products: string;
    customers: string;
    vendors: string;
  };
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  image: string;
}

export default function AboutPage() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState<AboutData>({
    description:
      "Welcome to Pacific Rim Fusion, the leading B2B online auction marketplace dedicated to empowering local cannabis farms and businesses in markets often dominated by larger operators. Operating in Federally legal jurisdictions including Thailand, Germany, and Canada, we specialize in facilitating the sale of surplus cannabis and cannabis-related products through a secure and dynamic platform.",
    sections: [
      {
        id: "mission",
        title: "Our Mission",
        content:
          "Our mission at Pacific Rim Fusion is to level the playing field for local cannabis businesses by providing a platform that enhances their visibility and competitive edge in an expanding and evolving market. We are committed to streamlining the cannabis supply chain, ensuring legal compliance, and fostering sustainable business practices.",
      },
      {
        id: "offer",
        title: "What We Offer",
        content: [
          "Auctions: Our auction platform allows local sellers to showcase their products to a broad audience, ensuring that they receive fair market value through competitive bidding.",
          "Reverse Auctions: This innovative approach empowers buyers to specify what they are willing to pay for products, providing local sellers the opportunity to adjust and compete effectively in real-time.",
          "Buy Now: For immediate sales needs, our Buy Now option allows for instant transactions at fixed prices, ideal for quick inventory turnover and immediate cash flow.",
        ],
      },
      {
        id: "empowerment",
        title: "Empowering Local Businesses",
        content: [
          "Competitive Access: We provide local businesses with the tools to compete on equal footing with foreign operators, broadening their market reach and increasing their sales opportunities.",
          "Regulatory Compliance: Our platform ensures that all participants have valid Cannabis Business licenses and that those licenses are in good standing with the respective agencies or authorities. In this way, transactions comply with local and international laws, giving local businesses a secure and reliable environment to operate within.",
          "Enhanced Visibility: By participating in our marketplace, local farms and businesses gain significant exposure, attracting buyers who are interested in supporting and sourcing from local producers.",
          "Strategic Networking: We facilitate connections within the cannabis industry, allowing local businesses to forge partnerships, learn from peers, and collaborate on initiatives that enhance their competitive stance.",
        ],
      },
      {
        id: "commitment",
        title: "Our Commitment",
        content:
          "Pacific Rim Fusion is dedicated to fostering a marketplace that supports fair competition and the growth of local businesses. We adhere to the highest standards of integrity, transparency, and compliance, ensuring a safe and effective environment for all users.",
      },
    ],
    stats: {
      products: "30555",
      customers: "12259",
      vendors: "2037",
    },
    socialLinks: {
      facebook: "https://www.facebook.com/",
      twitter: "https://www.twitter.com/",
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
    },
    image: `${process.env.NEXT_PUBLIC_ASSETS_URL}/1vedE.png`,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadImage(formData);

      if (result.success) {
        setData((prev) => ({
          ...prev,
          image: result.url ?? "",
        }));
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
  };

  const addSection = () => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      title: "New Section",
      content: "Enter content here",
    };
    setData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const removeSection = (id: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== id),
    }));
  };

  const updateSection = (
    id: string,
    field: "title" | "content",
    value: string | string[]
  ) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      ),
    }));
  };

  const addListItem = (sectionId: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: Array.isArray(section.content)
                ? [...section.content, "New item"]
                : [section.content, "New item"],
            }
          : section
      ),
    }));
  };

  const removeListItem = (sectionId: string, index: number) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId && Array.isArray(section.content)
          ? {
              ...section,
              content: section.content.filter((_, i) => i !== index),
            }
          : section
      ),
    }));
  };

  if (isEditing) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-900 to-indigo-900 p-4 rounded-t-lg">
          <h1 className="text-2xl font-bold text-white">About Us</h1>
          <Button onClick={handleSave} variant="secondary">
            Save Changes
          </Button>
        </div>

        <Card className="space-y-6 p-6">
          <div className="space-y-4">
            <label className="block font-medium">Description</label>
            <Textarea
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              rows={4}
            />
          </div>

          {data.sections.map((section) => (
            <div key={section.id} className="space-y-4 border-t pt-4">
              <div className="flex justify-between items-center">
                <Input
                  value={section.title}
                  onChange={(e) =>
                    updateSection(section.id, "title", e.target.value)
                  }
                  className="font-bold text-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSection(section.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
             
            </div>
          ))}

          <Button onClick={addSection} variant="outline">
            <Plus className="w-4 h-4 mr-2" /> Add New Section
          </Button>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium">Products</label>
              <Input
                value={data.stats.products}
                onChange={(e) =>
                  setData({
                    ...data,
                    stats: { ...data.stats, products: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="block font-medium">Customers</label>
              <Input
                value={data.stats.customers}
                onChange={(e) =>
                  setData({
                    ...data,
                    stats: { ...data.stats, customers: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="block font-medium">Vendors</label>
              <Input
                value={data.stats.vendors}
                onChange={(e) =>
                  setData({
                    ...data,
                    stats: { ...data.stats, vendors: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block font-medium">Social Links</label>
            <div className="space-y-2">
              <Input
                placeholder="Facebook"
                value={data.socialLinks.facebook}
                onChange={(e) =>
                  setData({
                    ...data,
                    socialLinks: {
                      ...data.socialLinks,
                      facebook: e.target.value,
                    },
                  })
                }
              />
              <Input
                placeholder="Twitter"
                value={data.socialLinks.twitter}
                onChange={(e) =>
                  setData({
                    ...data,
                    socialLinks: {
                      ...data.socialLinks,
                      twitter: e.target.value,
                    },
                  })
                }
              />
              <Input
                placeholder="Instagram"
                value={data.socialLinks.instagram}
                onChange={(e) =>
                  setData({
                    ...data,
                    socialLinks: {
                      ...data.socialLinks,
                      instagram: e.target.value,
                    },
                  })
                }
              />
              <Input
                placeholder="LinkedIn"
                value={data.socialLinks.linkedin}
                onChange={(e) =>
                  setData({
                    ...data,
                    socialLinks: {
                      ...data.socialLinks,
                      linkedin: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="space-y-4">
            <label className="block font-medium">Company Image</label>
            <div className="relative">
              <img
                src={data.image || "/placeholder.svg"}
                alt="Company Logo"
                className="w-full h-[300px] object-cover rounded-lg border"
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <Button
                className="absolute bottom-4 right-4"
                onClick={triggerImageUpload}
                disabled={uploading}
              >
                {uploading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Update Image
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[12px] p-6 space-y-8">
      <div className="flex justify-between items-center bg-primary p-4 rounded-t-lg">
        <h1 className="text-[28px] font-bold text-[#FFFFFF]">About Us</h1>
        <Button onClick={() => setIsEditing(true)} variant="secondary">
          Edit
        </Button>
      </div>

      <div className="space-y-8">
        <p className="text-gray-600">{data.description}</p>

        {data.sections.map((section) => (
          <div key={section.id}>
            <h2 className="text-xl font-bold mb-2">{section.title}</h2>
            {Array.isArray(section.content) ? (
              <ul className="list-disc pl-6 space-y-2">
                {section.content.map((item, index) => (
                  <li key={index} className="text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">{section.content}</p>
            )}
          </div>
        ))}

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Products</label>
            <Input
              value={data.stats.products}
              onChange={(e) =>
                setData({
                  ...data,
                  stats: { ...data.stats, products: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium">Customers</label>
            <Input
              value={data.stats.customers}
              onChange={(e) =>
                setData({
                  ...data,
                  stats: { ...data.stats, customers: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label className="block font-medium">Vendors</label>
            <Input
              value={data.stats.vendors}
              onChange={(e) =>
                setData({
                  ...data,
                  stats: { ...data.stats, vendors: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="flex ">
          <div className="w-[49%] space-y-4">
            <label className="block font-medium">Social Links</label>
            <div className="space-y-2">
              <Input
                placeholder="Facebook"
                value={data.socialLinks.facebook}
                onChange={(e) =>
                  setData({
                    ...data,
                    socialLinks: {
                      ...data.socialLinks,
                      facebook: e.target.value,
                    },
                  })
                }
              />
              <Input
                placeholder="Twitter"
                value={data.socialLinks.twitter}
                onChange={(e) =>
                  setData({
                    ...data,
                    socialLinks: {
                      ...data.socialLinks,
                      twitter: e.target.value,
                    },
                  })
                }
              />
              <Input
                placeholder="Instagram"
                value={data.socialLinks.instagram}
                onChange={(e) =>
                  setData({
                    ...data,
                    socialLinks: {
                      ...data.socialLinks,
                      instagram: e.target.value,
                    },
                  })
                }
              />
              <Input
                placeholder="LinkedIn"
                value={data.socialLinks.linkedin}
                onChange={(e) =>
                  setData({
                    ...data,
                    socialLinks: {
                      ...data.socialLinks,
                      linkedin: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="w-[49%] mt-8">
            <img
              src={data.image || "/placeholder.svg"}
              alt="Company Logo"
              className="w-full h-[300px] object-cover rounded-lg border"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
