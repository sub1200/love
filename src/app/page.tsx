
"use client";

import * as React from "react";
import { 
  BrainCircuit, 
  Dices, 
  Edit, 
  Heart, 
  Library, 
  Plus, 
  Sparkles, 
  TimerIcon, 
  Image as ImageIcon,
  Languages 
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initialActs, type Act, type ActCategory } from "@/lib/acts";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generatePersonalizedChallenge } from "@/ai/flows/generate-personalized-challenge";
import { Skeleton } from "@/components/ui/skeleton";

type Lang = "ar" | "en";

const translations = {
  ar: {
    title: "Habibi's Heat",
    subtitle: "لعبة الحب الخاص بكم",
    tabs: {
      library: "مكتبة الأفعال",
      random: "تحدي عشوائي",
      generator: "مولد التحديات",
    },
    categories: {
      all: "الكل",
      vaginal: "مهبلي",
      anal: "شرجي",
      tasting: "تذوق",
      position: "أوضاع",
    },
    buttons: {
      addCustom: "أضف أمراً مخصصاً",
      reveal: "اكشف عن تحدٍ",
      start: "ابدأ",
      edit: "تعديل",
      another: "كشف تحدي آخر",
      spin: "دور!",
      generate: "أنشئ تحديًا شخصيًا",
      generating: "جاري الإنشاء...",
      close: "إغلاق",
      reset: "إعادة ضبط",
      pause: "إيقاف مؤقت",
      save: "حفظ التغييرات",
      add: "إضافة",
      cancel: "إلغاء",
    },
    placeholders: {
      pastInteractions: "مثال: نستمتع بالأوضاع الجديدة ولكننا نفضل الإيلاج اللطيف...",
      preferences: "مثال: نرغب في تجربة شيء أكثر جرأة...",
      customTitle: "مثال: قبلة فرنسية لمدة 5 دقائق",
      customDesc: "صف التحدي بالتفصيل...",
    },
    labels: {
      timer: "مؤقت التحدي",
      pastInteractions: "التفاعلات السابقة",
      preferences: "التفضيلات الحالية",
      title: "العنوان",
      desc: "الوصف",
      image: "صورة (اختياري)",
      category: "الفئة",
    },
    messages: {
      noChallenges: "لا توجد تحديات متاحة في هذه الفئة.",
      successAdd: "تمت إضافة الأمر المخصص بنجاح.",
      successEdit: "تم تعديل الأمر بنجاح.",
      aiTitle: "تحدي مولد بالذكاء الاصطناعي",
      aiSuggested: "التحدي المقترح لكما!",
      libraryWelcome: "هل أنت مستعد لتحدي جديد؟ اضغط على الزر أدناه للكشف عن تحدٍ.",
      randomWelcome: "هل أنت مستعد للمفاجأة؟ اضغط على الزر أدناه لاختيار تحدي عشوائي!",
      aiWelcome: "احصل على تحديات مخصصة تمامًا لكما بناءً على تفضيلاتكما.",
    }
  },
  en: {
    title: "Habibi's Heat",
    subtitle: "Your Personal Love Game",
    tabs: {
      library: "Acts Library",
      random: "Random Challenge",
      generator: "Challenge Generator",
    },
    categories: {
      all: "All",
      vaginal: "Vaginal",
      anal: "Anal",
      tasting: "Tasting",
      position: "Positions",
    },
    buttons: {
      addCustom: "Add Custom Act",
      reveal: "Reveal a Challenge",
      start: "Start",
      edit: "Edit",
      another: "Reveal Another",
      spin: "Spin!",
      generate: "Generate Personalized Challenge",
      generating: "Generating...",
      close: "Close",
      reset: "Reset",
      pause: "Pause",
      save: "Save Changes",
      add: "Add",
      cancel: "Cancel",
    },
    placeholders: {
      pastInteractions: "Example: We enjoy new positions but prefer gentle moves...",
      preferences: "Example: We want to try something bolder...",
      customTitle: "Example: 5-minute French kiss",
      customDesc: "Describe the challenge in detail...",
    },
    labels: {
      timer: "Challenge Timer",
      pastInteractions: "Past Interactions",
      preferences: "Current Preferences",
      title: "Title",
      desc: "Description",
      image: "Image (Optional)",
      category: "Category",
    },
    messages: {
      noChallenges: "No challenges available in this category.",
      successAdd: "Custom act added successfully.",
      successEdit: "Act updated successfully.",
      aiTitle: "AI Generated Challenge",
      aiSuggested: "Your Suggested Challenge!",
      libraryWelcome: "Ready for a new challenge? Click the button below to reveal one.",
      randomWelcome: "Ready for a surprise? Click below to pick a random challenge!",
      aiWelcome: "Get challenges tailored exactly to your preferences.",
    }
  }
};

const ChallengeView = ({ challenge, lang }: { challenge: Act | null, lang: Lang }) => {
  const [timeLeft, setTimeLeft] = React.useState(10 * 60);
  const [isTimerActive, setIsTimerActive] = React.useState(false);
  const t = translations[lang];

  React.useEffect(() => {
    if (!challenge) return;
    setTimeLeft(challenge.timer || 10 * 60);
    setIsTimerActive(false);
  }, [challenge]);

  React.useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;
    const intervalId = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(intervalId);
  }, [isTimerActive, timeLeft]);

  if (!challenge) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="space-y-4">
       {challenge.image && (challenge.image.startsWith('http') || challenge.image.startsWith('data:image')) ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={challenge.image}
            alt={lang === 'ar' ? challenge.titleAr : challenge.titleEn}
            fill
            className="object-cover"
            data-ai-hint="couple position"
          />
        </div>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center">
            <ImageIcon className="h-16 w-16 text-muted-foreground" />
        </div>
      )}
      <DialogHeader>
        <DialogTitle className="text-2xl font-headline flex items-center gap-2">
          <Sparkles className="text-primary w-6 h-6" />
          {lang === 'ar' ? challenge.titleAr : challenge.titleEn}
        </DialogTitle>
        <DialogDescription>
          {lang === 'ar' ? challenge.descriptionAr : challenge.descriptionEn}
        </DialogDescription>
      </DialogHeader>
      <div className="border-t border-dashed pt-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <TimerIcon className="text-primary w-5 h-5" />
          {t.labels.timer}
        </h3>
        <div className="flex items-center justify-center gap-4 bg-muted/50 p-4 rounded-lg">
          <div className="text-5xl font-mono font-bold text-primary tracking-widest">
            <span>{String(minutes).padStart(2, "0")}</span>:
            <span>{String(seconds).padStart(2, "0")}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setIsTimerActive(!isTimerActive)}
              disabled={timeLeft <= 0}
              variant={isTimerActive ? "secondary" : "default"}
            >
              {isTimerActive ? t.buttons.pause : t.buttons.start}
            </Button>
            <Button
              onClick={() => {
                setIsTimerActive(false);
                setTimeLeft(challenge.timer || 10 * 60);
              }}
              variant="outline"
            >
              {t.buttons.reset}
            </Button>
          </div>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">{t.buttons.close}</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
};

const ActLibrary = ({ 
  acts, 
  onSelectChallenge, 
  onAddAct, 
  onEditAct, 
  lang 
}: { 
  acts: Act[], 
  onSelectChallenge: (act: Act) => void, 
  onAddAct: (act: Act) => void, 
  onEditAct: (act: Act) => void,
  lang: Lang
}) => {
  const [filter, setFilter] = React.useState<ActCategory | "all">("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [editingAct, setEditingAct] = React.useState<Act | null>(null);
  const [revealedChallenge, setRevealedChallenge] = React.useState<Act | null>(null);
  const t = translations[lang];

  const addActFormSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    category: z.enum(["vaginal", "anal", "tasting", "position"]),
    image: z.string().optional(),
  });

  const form = useForm<z.infer<typeof addActFormSchema>>({
    resolver: zodResolver(addActFormSchema),
    defaultValues: { title: "", description: "", category: "vaginal", image: "" },
  });

  const { toast } = useToast();
  
  const handleRevealClick = () => {
    let availableActs = acts.filter(
      (act) => filter === "all" || act.category === filter
    );

    if (availableActs.length === 0) {
      setRevealedChallenge(null);
      toast({
        variant: "destructive",
        title: t.messages.noChallenges,
      });
      return;
    }

    if (revealedChallenge && availableActs.length > 1) {
      availableActs = availableActs.filter(act => act.id !== revealedChallenge.id);
    }
    
    const randomIndex = Math.floor(Math.random() * availableActs.length);
    setRevealedChallenge(availableActs[randomIndex]);
  };

  React.useEffect(() => {
    setRevealedChallenge(null);
  }, [filter]);


  const handleAddSubmit = (values: z.infer<typeof addActFormSchema>) => {
    onAddAct({
      id: `custom-${Date.now()}`,
      titleAr: values.title,
      titleEn: values.title,
      descriptionAr: values.description,
      descriptionEn: values.description,
      category: values.category,
      timer: 600,
      image: values.image,
    });
    toast({ title: t.messages.successAdd });
    setIsAddDialogOpen(false);
    form.reset();
  };
  
  const handleEditSubmit = (values: z.infer<typeof addActFormSchema>) => {
    if (editingAct) {
      const updatedAct = {
        ...editingAct,
        titleAr: lang === 'ar' ? values.title : editingAct.titleAr,
        titleEn: lang === 'en' ? values.title : editingAct.titleEn,
        descriptionAr: lang === 'ar' ? values.description : editingAct.descriptionAr,
        descriptionEn: lang === 'en' ? values.description : editingAct.descriptionEn,
        category: values.category,
        image: values.image || editingAct.image,
      };
      onEditAct(updatedAct);
      toast({ title: t.messages.successEdit });
      if (revealedChallenge && revealedChallenge.id === editingAct.id) {
        setRevealedChallenge(updatedAct);
      }
    }
    setIsEditDialogOpen(false);
    setEditingAct(null);
    form.reset();
  };

  const openEditDialog = (act: Act) => {
    setEditingAct(act);
    form.reset({
        title: lang === 'ar' ? act.titleAr : act.titleEn,
        description: lang === 'ar' ? act.descriptionAr : act.descriptionEn,
        category: act.category,
        image: act.image || "",
    });
    setIsEditDialogOpen(true);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => fieldChange(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const categories: { key: ActCategory | "all"; name: string, icon: React.ElementType }[] = [
    { key: "all", name: t.categories.all, icon: Library },
    { key: "vaginal", name: t.categories.vaginal, icon: Heart },
    { key: "anal", name: t.categories.anal, icon: Heart },
    { key: "tasting", name: t.categories.tasting, icon: Sparkles },
    { key: "position", name: t.categories.position, icon: Dices },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.key}
            variant={filter === cat.key ? "default" : "outline"}
            onClick={() => setFilter(cat.key)}
            className="capitalize"
          >
            <cat.icon className={cn(lang === 'ar' ? "ml-2" : "mr-2", "h-4 w-4")} />
            {cat.name}
          </Button>
        ))}
        <Button variant="secondary" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className={cn(lang === 'ar' ? "ml-2" : "mr-2", "h-4 w-4")} />
          {t.buttons.addCustom}
        </Button>
      </div>

       <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-card rounded-xl shadow-lg min-h-[300px]">
        {revealedChallenge ? (
           <Card
            className="w-full max-w-sm flex flex-col hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300"
          >
            {revealedChallenge.image && (revealedChallenge.image.startsWith('http') || revealedChallenge.image.startsWith('data:image')) ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                 <Image
                    src={revealedChallenge.image}
                    alt={lang === 'ar' ? revealedChallenge.titleAr : revealedChallenge.titleEn}
                    fill
                    className="object-cover"
                    data-ai-hint="couple position"
                  />
              </div>
            ) : (
                <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-muted flex items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-muted-foreground" />
                </div>
            )}
            <CardHeader>
              <CardTitle className="font-headline text-xl">
                {lang === 'ar' ? revealedChallenge.titleAr : revealedChallenge.titleEn}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="line-clamp-3">
                {lang === 'ar' ? revealedChallenge.descriptionAr : revealedChallenge.descriptionEn}
              </CardDescription>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
              <Button className="w-full" onClick={() => onSelectChallenge(revealedChallenge)}>
                <Sparkles className={cn(lang === 'ar' ? "ml-2" : "mr-2", "h-4 w-4")} />
                {t.buttons.start}
              </Button>
               <Button className="w-full" variant="secondary" onClick={() => openEditDialog(revealedChallenge)}>
                <Edit className={cn(lang === 'ar' ? "ml-2" : "mr-2", "h-4 w-4")} />
                {t.buttons.edit}
              </Button>
              <Button className="w-full col-span-2" variant="outline" onClick={handleRevealClick}>
                <Dices className={cn(lang === 'ar' ? "ml-2" : "mr-2", "h-4 w-4")} />
                {t.buttons.another}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <>
            <Library className="h-20 w-20 text-primary animate-pulse" />
            <h2 className="mt-4 text-3xl font-headline font-bold">{t.tabs.library}</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              {t.messages.libraryWelcome}
            </p>
             <Button size="lg" className="mt-8 text-lg" onClick={handleRevealClick}>
                <Sparkles className={cn(lang === 'ar' ? "ml-3" : "mr-3", "h-6 w-6")} />
                {t.buttons.reveal}
            </Button>
          </>
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.buttons.addCustom}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.labels.title}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.placeholders.customTitle} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.labels.desc}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t.placeholders.customDesc} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.labels.image}</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, field.onChange)} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                   <FormItem>
                    <FormLabel>{t.labels.category}</FormLabel>
                     <select {...field} className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2")}>
                      {categories.filter(c => c.key !== 'all').map(c => (
                        <option key={c.key} value={c.key}>{c.name}</option>
                      ))}
                    </select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">{t.buttons.add}</Button>
                 <DialogClose asChild>
                    <Button type="button" variant="secondary">{t.buttons.cancel}</Button>
                 </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.buttons.edit}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.labels.title}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.labels.desc}</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.labels.image}</FormLabel>
                    <FormControl>
                       <Input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, field.onChange)} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                   <FormItem>
                    <FormLabel>{t.labels.category}</FormLabel>
                     <select {...field} className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2")}>
                      {categories.filter(c => c.key !== 'all').map(c => (
                        <option key={c.key} value={c.key}>{c.name}</option>
                      ))}
                    </select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">{t.buttons.save}</Button>
                 <DialogClose asChild>
                    <Button type="button" variant="secondary">{t.buttons.cancel}</Button>
                 </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const RandomChallenge = ({ acts, onSelectChallenge, lang }: { acts: Act[], onSelectChallenge: (act: Act) => void, lang: Lang }) => {
  const t = translations[lang];
  const handleSpin = () => {
    if (acts.length === 0) return;
    const randomIndex = Math.floor(Math.random() * acts.length);
    onSelectChallenge(acts[randomIndex]);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-card rounded-xl shadow-lg">
        <Dices className="h-20 w-20 text-primary animate-pulse" />
        <h2 className="mt-4 text-3xl font-headline font-bold">{t.tabs.random}</h2>
        <p className="mt-2 max-w-md text-muted-foreground">
            {t.messages.randomWelcome}
        </p>
        <Button size="lg" className="mt-8 text-lg" onClick={handleSpin}>
            <Sparkles className={cn(lang === 'ar' ? "ml-3" : "mr-3", "h-6 w-6")} />
            {t.buttons.spin}
        </Button>
    </div>
  )
}

const AiChallengeGenerator = ({ onSelectChallenge, lang }: { onSelectChallenge: (act: Act) => void, lang: Lang }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [generatedChallenge, setGeneratedChallenge] = React.useState<string | null>(null);
  const { toast } = useToast();
  const t = translations[lang];

  const aiFormSchema = z.object({
    pastInteractions: z.string().min(10),
    preferences: z.string().min(10),
  });

  const form = useForm<z.infer<typeof aiFormSchema>>({
    resolver: zodResolver(aiFormSchema),
    defaultValues: { pastInteractions: "", preferences: "" },
  });

  const onSubmit = async (values: z.infer<typeof aiFormSchema>) => {
    setIsLoading(true);
    setGeneratedChallenge(null);
    try {
      const result = await generatePersonalizedChallenge(values);
      setGeneratedChallenge(result.challenge);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate challenge. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const viewGeneratedChallenge = () => {
    if(generatedChallenge) {
      onSelectChallenge({
        id: `ai-${Date.now()}`,
        titleAr: t.messages.aiTitle,
        titleEn: t.messages.aiTitle,
        descriptionAr: generatedChallenge,
        descriptionEn: generatedChallenge,
        category: 'position',
        timer: 600,
        image: 'https://placehold.co/600x400.png',
      })
    }
  }

  return (
    <Card className="max-w-3xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <BrainCircuit className="mx-auto h-16 w-16 text-primary" />
        <CardTitle className="text-3xl font-headline">{t.tabs.generator}</CardTitle>
        <CardDescription>{t.messages.aiWelcome}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pastInteractions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.labels.pastInteractions}</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder={t.placeholders.pastInteractions} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.labels.preferences}</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder={t.placeholders.preferences} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t.buttons.generating : t.buttons.generate}
            </Button>
          </form>
        </Form>
        
        {isLoading && (
            <div className="mt-6 space-y-4">
                <Skeleton className="h-8 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-full" />
            </div>
        )}

        {generatedChallenge && (
            <Card className="mt-6 bg-primary/10">
                <CardHeader>
                    <CardTitle>{t.messages.aiSuggested}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg">{generatedChallenge}</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={viewGeneratedChallenge} className="w-full">
                         <Sparkles className={cn(lang === 'ar' ? "ml-2" : "mr-2", "h-4 w-4")} />
                        {t.buttons.start}
                    </Button>
                </CardFooter>
            </Card>
        )}
      </CardContent>
    </Card>
  );
};


export default function Home() {
  const [acts, setActs] = React.useState<Act[]>(initialActs);
  const [selectedChallenge, setSelectedChallenge] = React.useState<Act | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [language, setLanguage] = React.useState<Lang>("ar");

  React.useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleSelectChallenge = (act: Act) => {
    setSelectedChallenge(act);
    setIsDialogOpen(true);
  };

  const handleAddAct = (act: Act) => setActs(prev => [act, ...prev]);
  const handleEditAct = (updatedAct: Act) => {
    setActs(prev => prev.map(act => act.id === updatedAct.id ? updatedAct : act));
  };

  const t = translations[language];

  return (
    <main className="min-h-screen bg-background text-foreground font-body p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <header className="relative text-center mb-8">
          <div className={cn("absolute top-0", language === 'ar' ? "left-0" : "right-0")}>
            <Button variant="ghost" size="icon" onClick={() => setLanguage(l => l === 'ar' ? 'en' : 'ar')}>
              <Languages className="h-6 w-6 text-primary" />
            </Button>
          </div>
          <h1 className="text-5xl font-headline font-extrabold text-primary">{t.title}</h1>
          <p className="text-muted-foreground text-lg mt-2">{t.subtitle}</p>
        </header>

        <Tabs defaultValue="library" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-primary/10">
            <TabsTrigger value="library">
              <Library className={cn(language === 'ar' ? "ml-2" : "mr-2", "h-4 w-4")} />
              {t.tabs.library}
            </TabsTrigger>
            <TabsTrigger value="random">
              <Dices className={cn(language === 'ar' ? "ml-2" : "mr-2", "h-4 w-4")} />
              {t.tabs.random}
            </TabsTrigger>
            <TabsTrigger value="ai">
              <BrainCircuit className={cn(language === 'ar' ? "ml-2" : "mr-2", "h-4 w-4")} />
              {t.tabs.generator}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="library" className="mt-6">
            <ActLibrary acts={acts} onSelectChallenge={handleSelectChallenge} onAddAct={handleAddAct} onEditAct={handleEditAct} lang={language} />
          </TabsContent>
          <TabsContent value="random" className="mt-6">
            <RandomChallenge acts={acts} onSelectChallenge={handleSelectChallenge} lang={language} />
          </TabsContent>
          <TabsContent value="ai" className="mt-6">
            <AiChallengeGenerator onSelectChallenge={handleSelectChallenge} lang={language} />
          </TabsContent>
        </Tabs>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <ChallengeView challenge={selectedChallenge} lang={language} />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
